import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ChatPage.css";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../widgets/Input";
import Search from "./components/Search";
import {
  getAllChatRequest,
  updateChatLatestMessage,
} from "../../store/Actions/chatAction";
import Spinner from "../../components/Spinner/Spinner";
import {
  createMessageRequest,
  getAllMessageRequest,
  getAllUnseenMessageRequest,
  seenedMessageRequest,
} from "../../store/Actions/messageAction";
import io from "socket.io-client";

let socket;

const ChatPage = () => {
  const dispatch = useDispatch();

  const bottomRef = useRef(null);
  const [rows, setRows] = useState();
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
    if (e.keyCode === 8) {
      if (sendMessage.message.endsWith("\n")) {
        e.preventDefault();
        setRows((prv) => prv - 1);
        setSendMessage((prv) => {
          return { message: prv.message.slice(0, -1) };
        });
      }
    }
    if (e.key === "Enter") {
      if (e.shiftKey) {
        setSendMessage((prevState) => {
          return {
            ...prevState,
            [e.target.name]: e.target.value,
          };
        });
        setRows((prv) => prv + 1);
      } else {
        dispatch(
          createMessageRequest({
            data: {
              msg: sendMessage.message,
              chatId: selectedChat._id,
            },
            socket,
          })
        );
        setRows(1);
        socket.emit("stop-typing", {
          room: giveUserparams(selectedChat, "username"),
          chatId: selectedChat._id,
        });
        setSendMessage({ message: "" });
        e.preventDefault();
      }
    }
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

    const time = new Date().getTime();
    setTimeout(() => {
      const now = new Date().getTime();
      if (now - time > 3000)
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

    const row = sendMessage.message.match(/\n/g)?.length || 1;
    setRows(row);
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

      socket.emit("join-chat", selectedChat._id);
    }

    setSendMessage({ message: "" });
  }, [JSON.stringify(selectedChat)]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [JSON.stringify(Message[Message.length - 1])]);

  useEffect(() => {
    function handleNewMessage(msg) {
      if (!selectedChat._id || selectedChat._id !== msg.chat._id) {
        // for giving notification
        dispatch(getAllUnseenMessageRequest(msg));
        dispatch(
          updateChatLatestMessage({
            chatId: msg.chat._id,
            latestMessage: msg,
          })
        );
      } else {
        if (selectedChat._id === msg.chat._id)
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
                <div className="chatData text-elipsis">
                  <h1>{giveUserparams(chat, "username")}</h1>
                  {isTyping && isTyping === chat._id ? (
                    <p className="typing">typing...</p>
                  ) : (
                    <p className="text-elipsis ">{chat?.latestMessage?.msg}</p>
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
                type="textarea"
                rows={rows}
                placeholder="Type a message"
                className="msgInput scrollbar"
                autoComplete="off"
                width="80%"
                name="message"
                value={sendMessage}
                setValue={setSendMessage}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === "Backspace") &&
                  createMessage(e)
                }
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
