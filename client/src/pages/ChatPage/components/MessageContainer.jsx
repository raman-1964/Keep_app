import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createMessageRequest,
  getAllMessageRequest,
  getAllUnseenMessageRequest,
  seenedMessageRequest,
} from "../../../store/Actions/messageAction";
import { updateChatLatestMessage } from "../../../store/Actions/chatAction";
import Input from "../../../widgets/Input/Input";
import Spinner from "../../../components/Spinner/Spinner";
import downArrow from "../../../assets/img/downArrow.png";

const MessageContainer = ({
  loggedInUser,
  selectedChat,
  socket,
  isTyping,
  setIsTyping,
  giveUserparams,
}) => {
  const dispatch = useDispatch();

  const bottomRef = useRef(null);
  const [rows, setRows] = useState();
  const [page, setPage] = useState(1);
  const [showArrow, setShowArrow] = useState(false);
  const [sendMessage, setSendMessage] = useState({
    message: "",
  });

  const {
    Message,
    unseenMessage,
    MessageLoading,
    isNextPage,
    isNextPageLoading,
  } = useSelector((state) => state.messageReducer);

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

  const fetchMessages = (str) => {
    const paramsObj = {
      limit: 25,
      chatId: selectedChat._id,
      ...(str === "first" ? { page: 1 } : { page }),
    };
    dispatch(getAllMessageRequest(paramsObj));
  };

  const scrollBottom = useCallback(() => {
    if (Message[Message.length - 1]?._id && bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [Message[Message.length - 1]?._id]);

  const observerCallback = (entries) => {
    setShowArrow(entries[0].isIntersecting);
  };
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  useEffect(() => {
    const row = sendMessage.message.match(/\n/g)?.length || 1;
    setRows(row);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    if (bottomRef.current) observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [Message.length]);

  useEffect(() => {
    scrollBottom();
  }, [Message[Message.length - 1]?._id]);

  useEffect(() => {
    if (selectedChat._id) {
      setPage(1);
      fetchMessages("first");
      const willSeen = unseenMessage
        .map((msg) => {
          if (msg.chat._id === selectedChat._id) return msg._id;
        })
        .filter((id) => {
          if (id) return id;
        });
      if (willSeen.length)
        dispatch(seenedMessageRequest({ messages_id: willSeen }));

      setSendMessage({ message: "" });
    }
  }, [selectedChat._id]);

  useEffect(() => {
    if (selectedChat._id && page > 1) fetchMessages();
  }, [page]);

  useEffect(() => {
    if (socket) {
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
    }
  });

  return (
    <>
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
          <div
            className="allMsg scrollbar"
            onScroll={(e) => {
              if (e.target.scrollTop === 0 && isNextPage)
                setPage((prev) => 1 + prev);
            }}
          >
            {isNextPageLoading ? (
              <div className="spinner-chat-cont">
                <Spinner />
              </div>
            ) : null}
            {Message.map((msg, ind) => (
              <div
                key={`${msg._id}-${ind}`}
                className="singlemsg"
                style={{
                  ...(msg.sender.username === loggedInUser && {
                    alignSelf: "flex-end",
                  }),
                }}
                ref={ind === Message.length - 1 ? bottomRef : undefined}
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
                (e.key === "Enter" || e.key === "Backspace") && createMessage(e)
              }
              onChange={(e) => typingfn(e)}
            />
            {!showArrow ? (
              <div className="downArrow" onClick={() => scrollBottom()}>
                <img src={downArrow} />
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <div className="selectChat">
          <h1>select anyone to chat</h1>
        </div>
      )}
    </>
  );
};
export default MessageContainer;
