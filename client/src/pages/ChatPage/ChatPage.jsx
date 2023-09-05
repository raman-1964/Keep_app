import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ChatPage.css";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../widgets/Input";
import Search from "./components/Search";
import { getAllChatRequest } from "../../store/Actions/chatAction";
import Spinner from "../../components/Spinner/Spinner";
import {
  createMessageRequest,
  getAllMessageRequest,
  getAllUnseenMessageRequest,
  seenedMessageRequest,
} from "../../store/Actions/messageAction";
import io from "socket.io-client";

let socket;
let selectedChatCompare = {};

const ChatPage = () => {
  const dispatch = useDispatch();

  const bottomRef = useRef(null);
  const [isTyping, setIsTyping] = useState(null);
  const [selectedChat, setSelectedChat] = useState({});
  const [sendMessage, setSendMessage] = useState({
    message: "",
  });

  const loggedInUser = localStorage.getItem("Raman-Keep-Username");
  const { chats, chatLoading } = useSelector((state) => state.chatReducer);
  const { Message, unseenMessage, MessageLoading } = useSelector(
    (state) => state.messageReducer
  );

  const giveUserparams = (chat, params) => {
    return params === "username"
      ? loggedInUser === chat?.users?.[0]?.username
        ? chat?.users?.[1]?.[params]
        : chat?.users?.[0]?.[params]
      : loggedInUser === chat?.users?.[0]?.username
      ? chat?.users?.[0]?.[params]
      : chat?.users?.[1]?.[params];
  };

  const createMessage = (e) => {
    e.preventDefault();
    dispatch(
      createMessageRequest({
        data: {
          msg: sendMessage.message,
          chatId: selectedChat._id,
        },
        socket,
      })
    );
    socket.emit("stop-typing", {
      room: giveUserparams(selectedChat, "username"),
      chatId: selectedChat._id,
    });
    setSendMessage({ message: "" });
  };

  const msgNotif = useCallback(
    (chat) => {
      return unseenMessage
        .map((msg) => {
          if (msg.chat._id === chat._id) return 1;
          return 0;
        })
        .reduce((accum, ele) => accum + ele, 0);
    },
    [JSON.stringify(unseenMessage)]
  );

  const typingfn = (e) => {
    setSendMessage((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });

    if (!socket) return;

    socket.emit("typing", {
      room: giveUserparams(selectedChat, "username"),
      chatId: selectedChat._id,
    });

    setTimeout(() => {
      socket.emit("stop-typing", {
        room: giveUserparams(selectedChat, "username"),
        chatId: selectedChat._id,
      });
    }, 3000);
  };

  useEffect(() => {
    dispatch(getAllChatRequest());
    socket = io(process.env.REACT_APP_ENDPOINT);
    socket.emit("setup", loggedInUser);
  }, []);

  useEffect(() => {
    if (selectedChat._id) {
      dispatch(getAllMessageRequest({ chatId: selectedChat._id }));

      const willSeen = unseenMessage
        .map((msg) => {
          if (msg.chat._id === selectedChat._id) return msg._id;
        })
        .filter((id) => {
          if (id) return id;
        });
      if (willSeen.length)
        dispatch(seenedMessageRequest({ messages_id: willSeen }));

      selectedChatCompare = selectedChat;
      socket.emit("join-chat", selectedChat._id);
    }
  }, [JSON.stringify(selectedChat)]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [JSON.stringify(Message[Message.length - 1])]);

  useEffect(() => {
    function handleNewMessage(msg) {
      if (
        !selectedChatCompare._id ||
        selectedChatCompare._id !== msg.chat._id
      ) {
        // for giving notification
        dispatch(getAllUnseenMessageRequest(msg));
        dispatch(
          updateChatLatestMessage({
            chatId: msg.chat._id,
            latestMessage: msg,
          })
        );
      } else {
        if (selectedChatCompare._id === msg.chat._id)
          dispatch(
            seenedMessageRequest({
              messages_id: [msg._id],
              seenBy: giveUserparams(selectedChat, "_id"),
            })
          );
        dispatch(
          updateChatLatestMessage({
            chatId: selectedChat._id,
            latestMessage: msg,
          })
        );
        dispatch(createMessageRequest(msg));
      }
    }
    function typing(room) {
      setIsTyping(room);
    }
    function stopTyping() {
      setIsTyping(null);
    }

    socket.on("new-msg-received", handleNewMessage);
    socket.on("Typing", typing);
    socket.on("stopTyping", stopTyping);

    return () => {
      socket.off("new-msg-received", handleNewMessage);
      socket.off("Typing", typing);
      socket.off("stopTyping", stopTyping);
    };
  });

  return !chatLoading ? (
    <div className="pageContainer">
      <div className="chatHighlitcontNDsearch">
        <Search setSelectedChat={setSelectedChat} />
        <div className="chatHighlitcont">
          {chats.map((chat, ind) => {
            return (
              <div
                key={ind}
                className={`chatHighlit ${
                  selectedChat._id === chat._id ? "BG-chatHighlit" : ""
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="img"></div>
                <div className="chatData">
                  <h1>{giveUserparams(chat, "username")}</h1>
                  {isTyping && isTyping === chat._id ? (
                    <p>typing...</p>
                  ) : (
                    <p>{chat?.latestMessage?.msg}</p>
                  )}
                </div>
                {unseenMessage.length && msgNotif(chat) ? (
                  <h1 className="msgNotif">{msgNotif(chat)}</h1>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <div className="msgCont">
        {MessageLoading ? (
          <div className="spinnerCont">
            <Spinner />
          </div>
        ) : Object.keys(selectedChat).length ? (
          <>
            <div className={`chatHighlit `}>
              <div className="img"></div>
              <div className="chatData">
                <h1>{giveUserparams(selectedChat, "username")}</h1>
                {isTyping && isTyping === selectedChat._id ? (
                  <p>typing...</p>
                ) : null}
              </div>
            </div>
            <div className="allMsg">
              {Message.map((msg, ind) => (
                <div
                  key={`${msg._id}-${ind}`}
                  className="singlemsg"
                  style={{
                    ...(msg.sender.username === loggedInUser && {
                      alignSelf: "flex-end",
                    }),
                  }}
                  ref={(el) => {
                    if (ind === Message.length - 1) {
                      bottomRef.current = el;
                    }
                  }}
                >
                  <p>{msg?.msg}</p>
                </div>
              ))}
            </div>
            <div className="msgInputCont">
              <Input
                type="text"
                placeholder="Type a message"
                className="msgInput"
                autoComplete="off"
                width="80%"
                name="message"
                value={sendMessage}
                setValue={setSendMessage}
                onKeyDown={(e) => e.key === "Enter" && createMessage(e)}
                onChange={(e) => typingfn(e)}
              />
            </div>
          </>
        ) : (
          <div className="selectChat">
            <h1>select anyone to chat</h1>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="spinnerCont">
      <Spinner />
    </div>
  );
};

export default ChatPage;
