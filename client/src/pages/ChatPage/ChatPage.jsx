import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ChatPage.css";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../widgets/Input/Input";

import { getAllChatRequest } from "../../store/Actions/chatAction";

import Search from "./components/Search";
import { pagination } from "../../utils/pagination";
import Spinner from "../../components/Spinner/Spinner";
import MessageContainer from "./components/MessageContainer";
import io from "socket.io-client";

let socket;

const ChatPage = () => {
  const dispatch = useDispatch();

  const observer = useRef(null);
  const [page, setPage] = useState(1);
  const [isTyping, setIsTyping] = useState(null);
  const [selectedChat, setSelectedChat] = useState({});

  const loggedInUser = localStorage.getItem("Raman-Keep-Username");
  const { chats, chatLoading, isNextPage, isNextPageLoading } = useSelector(
    (state) => state.chatReducer
  );
  const { unseenMessage } = useSelector((state) => state.messageReducer);

  const giveUserparams = useCallback((chat, params) => {
    return params === "username"
      ? loggedInUser === chat?.users?.[0]?.username
        ? chat?.users?.[1]?.[params]
        : chat?.users?.[0]?.[params]
      : loggedInUser === chat?.users?.[0]?.username
      ? chat?.users?.[0]?.[params]
      : chat?.users?.[1]?.[params];
  });

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

  const lastElementRef = useCallback(
    (element) => pagination(element, observer, isNextPage, setPage),
    [isNextPage]
  );

  useEffect(() => {
    socket = io(process.env.REACT_APP_ENDPOINT);
    socket.emit("setup", loggedInUser);
  }, []);

  useEffect(() => {
    const paramsObj = {
      page,
      limit: 15,
    };
    dispatch(getAllChatRequest(paramsObj));

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [page]);

  return !chatLoading ? (
    <div className="pageContainer">
      <div className="chatHighlitcontNDsearch">
        <Search setSelectedChat={setSelectedChat} />
        <div className="chatHighlitcont scrollbar">
          {chats.map((chat, ind) => {
            return (
              <div
                ref={ind === chats.length - 1 ? lastElementRef : undefined}
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
          {isNextPageLoading ? (
            <div className="spinner-chat-cont">
              <Spinner />
            </div>
          ) : null}
        </div>
      </div>
      <div className="msgCont">
        <MessageContainer
          loggedInUser={loggedInUser}
          selectedChat={selectedChat}
          socket={socket}
          isTyping={isTyping}
          setIsTyping={setIsTyping}
          giveUserparams={giveUserparams}
        />
      </div>
    </div>
  ) : (
    <div className="spinnerCont">
      <Spinner />
    </div>
  );
};

export default ChatPage;
