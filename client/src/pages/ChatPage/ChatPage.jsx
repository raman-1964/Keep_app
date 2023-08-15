import React, { useEffect, useState } from "react";
import "./ChatPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../widgets/Input";
import Search from "./Search";
import { getAllChatRequest } from "../../store/Actions/chatAction";
import Spinner from "../../components/Spinner";
import {
  createMessageRequest,
  getAllMessageRequest,
  seenedMessageRequest,
} from "../../store/Actions/messageAction";

const ChatPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedChat, setSelectedChat] = useState({});
  const [sendMessage, setSendMessage] = useState({
    message: "",
  });
  const { chats, chatLoading, createChatLoading } = useSelector(
    (state) => state.chatReducer
  );
  const { Message, unseenMessage, MessageLoading } = useSelector(
    (state) => state.messageReducer
  );
  const loggedInUser = localStorage.getItem("Raman-Keep-Username");

  const createMessage = (e) => {
    e.preventDefault();
    // const { isValid, errors } = loginAllValidation(loginData);
    // if (isValid)
    dispatch(
      createMessageRequest({
        msg: sendMessage.message,
        chatId: selectedChat._id,
      })
    );
    setSendMessage({ message: "" });
    // setError(errors);
  };

  const msgNotif = (chat) => {
    return unseenMessage
      .map((msg) => {
        if (msg.chat === chat._id) return 1;
        return 0;
      })
      .reduce((accum, ele) => accum + ele, 0);
  };

  useEffect(() => {
    dispatch(getAllChatRequest());
  }, []);

  useEffect(() => {
    if (selectedChat._id) {
      dispatch(getAllMessageRequest({ chatId: selectedChat._id }));

      const willSeen = unseenMessage
        .map((msg) => {
          if (msg.chat === selectedChat._id) return msg._id;
        })
        .filter((id) => {
          if (id) return id;
        });
      if (willSeen.length)
        dispatch(seenedMessageRequest({ messages_id: willSeen }));
    }
  }, [JSON.stringify(selectedChat)]);

  console.log(MessageLoading);

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
                  <h1>
                    {loggedInUser === chat?.users?.[0]?.username
                      ? chat?.users?.[1]?.username
                      : chat?.users?.[0]?.username}
                  </h1>
                  <p>{chat?.latestMessage?.msg}</p>
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
                <h1>
                  {loggedInUser === selectedChat?.users?.[0]?.username
                    ? selectedChat?.users?.[1]?.name
                    : selectedChat?.users?.[0]?.name}
                </h1>
              </div>
            </div>
            <div className="allMsg">
              {Message.map((msg, ind) => (
                <div
                  key={msg._id}
                  className="singlemsg"
                  style={{
                    ...(msg.sender.username === loggedInUser && {
                      alignSelf: "flex-end",
                    }),
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
