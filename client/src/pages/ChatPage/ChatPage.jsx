import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ChatPage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllChatRequest,
  updateChatLatestMessage,
} from "../../store/Actions/chatAction";
import {
  createSocket,
  destroyConnection,
  offerRecieved,
} from "../../store/Actions/socket-call";
import {
  createMessageRequest,
  getAllUnseenMessageRequest,
  seenedMessageRequest,
} from "../../store/Actions/messageAction";
import { ReactComponent as Profile } from "../../assets/svg/profile.svg";
import Search from "./components/Search";
import { pagination } from "../../utils/pagination";
import Spinner from "../../components/Spinner/Spinner";
import MessageContainer from "./components/MessageContainer";
import CallerDropDown from "./components/CallerDropDown/CallerDropDown";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { defaultToastSetting } from "../../utils/constants";
import { useWindowDimension } from "../../components/CustomHooks/CustomHooks";

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const selectedChatRef = useRef(null);
  const observer = useRef(null);

  const { dimensions } = useWindowDimension();
  const [page, setPage] = useState(1);
  const [isTyping, setIsTyping] = useState(null);
  const [selectedChat, setSelectedChat] = useState({
    ...(state?.res && { ...state.res }),
  });
  const [selectedUser, setSelectedUser] = useState({});

  const loggedInUser = localStorage.getItem("Raman-Keep-Username");
  const { chats, chatLoading, isNextPage, isNextPageLoading } = useSelector(
    (state) => state.chatReducer
  );
  const { unseenMessage } = useSelector((state) => state.messageReducer);
  const { socket, connection } = useSelector(
    (state) => state.socketCallReducer
  );

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

  const imageURL = (users) => {
    return loggedInUser === users?.[0]?.username
      ? users?.[1]?.imgUrl
      : users?.[0]?.imgUrl;
  };

  const getSideBar = () => {
    return (
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
                {imageURL(chat?.users) ? (
                  <img className="img" src={imageURL(chat?.users)} />
                ) : (
                  <Profile className="img" />
                )}

                <div className="chatData text-elipsis">
                  <h1>
                    {loggedInUser === chat?.users?.[0]?.username
                      ? chat?.users?.[1]?.username
                      : chat?.users?.[0]?.username}
                  </h1>

                  <p
                    className={`${
                      isTyping === chat._id && "typing"
                    } text-elipsis`}
                  >
                    {isTyping && isTyping === chat._id
                      ? "typing..."
                      : chat?.latestMessage?.msg}
                  </p>
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
    );
  };

  const getMsgCont = () => {
    return (
      <div className={`msgCont ${!selectedChat?._id && "emptyMsgCont"}`}>
        <MessageContainer
          loggedInUser={loggedInUser}
          selectedChat={selectedChat}
          isTyping={isTyping}
          setIsTyping={setIsTyping}
          selectedUser={selectedUser}
          dimensions={dimensions}
          setSelectedChat={setSelectedChat}
        />
      </div>
    );
  };

  useEffect(() => {
    dispatch(createSocket(loggedInUser));
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

  useEffect(() => {
    if (selectedChat?._id) {
      const selectedUsername =
        loggedInUser === selectedChat?.users?.[0]?.username
          ? selectedChat?.users?.[1]?.username
          : selectedChat?.users?.[0]?.username;

      const selectedUserId =
        loggedInUser === selectedChat?.users?.[0]?.username
          ? selectedChat?.users?.[0]?._id
          : selectedChat?.users?.[1]?._id;

      const imgUrl =
        loggedInUser === selectedChat?.users?.[0]?.username
          ? selectedChat?.users?.[1]?.imgUrl
          : selectedChat?.users?.[0]?.imgUrl;
      setSelectedUser({ id: selectedUserId, name: selectedUsername, imgUrl });
      selectedChatRef.current = selectedChat;
    }

    return () => {
      setSelectedUser({});
    };
  }, [selectedChat?._id]);

  useEffect(() => {
    if (socket) {
      function handleNewMessage(msg) {
        console.log(msg, selectedChat);
        if (
          !selectedChatRef.current?._id ||
          selectedChatRef.current?._id !== msg.chat._id
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
          if (selectedChatRef.current._id === msg.chat._id)
            dispatch(
              seenedMessageRequest({
                messages_id: [msg._id],
                seenBy: selectedUser.id,
              })
            );
          dispatch(
            updateChatLatestMessage({
              chatId: selectedChatRef.current._id,
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
      function handleCallDropDown({ from, offer, config }) {
        dispatch(offerRecieved({ from, offer, config }));
      }
      function callCuted() {
        dispatch(destroyConnection());
        connection.destroy();
        toast.warning("call ended", defaultToastSetting);
        navigate("/chat");
      }

      socket.on("Typing", typing);
      socket.on("stopTyping", stopTyping);
      socket.on("new-msg-received", handleNewMessage);

      socket.on("offer", handleCallDropDown);
      socket.on("cut-call", callCuted);

      return () => {
        socket.off("Typing", typing);
        socket.off("stopTyping", stopTyping);
        socket.off("new-msg-received", handleNewMessage);

        socket.off("offer", handleCallDropDown);
        socket.off("cut-call", callCuted);
      };
    }
  }, [socket]);

  return !chatLoading ? (
    <>
      <CallerDropDown />
      <div className="pageContainer">
        {dimensions.width > 700 ? (
          <>
            {getSideBar()} {getMsgCont()}
          </>
        ) : null}
        {dimensions.width <= 700
          ? Object.keys(selectedChat).length === 0
            ? getSideBar()
            : getMsgCont()
          : null}
      </div>
    </>
  ) : (
    <div className="spinnerCont">
      <Spinner />
    </div>
  );
};

export default ChatPage;
