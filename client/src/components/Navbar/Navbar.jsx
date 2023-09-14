import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as HomeIcon } from "../../assets/svg/homeIcon.svg";
import { ReactComponent as Dark } from "../../assets/svg/dark.svg";
import { ReactComponent as Day } from "../../assets/svg/day.svg";
import { ReactComponent as Logout } from "../../assets/svg/logout.svg";
import ChatIcon from "../../assets/img/chatIcon.png";
import ProfileIcon from "../../assets/img/profileIcon.png";
import { logoutRequest } from "../../store/Actions/loginAction";
import Logo from "../Logo/Logo";
import { getAllUnseenMessageRequest } from "../../store/Actions/messageAction";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const dispatch = useDispatch();
  const { unseenMessage } = useSelector((state) => state.messageReducer);

  useEffect(() => {
    if (dark) document.body.style.backgroundColor = "black";
    return () => (document.body.style.backgroundColor = null);
  }, [dark]);

  useEffect(() => {
    dispatch(getAllUnseenMessageRequest());
  }, []);

  return (
    <>
      <nav className="navbar">
        <Logo />
        <div className="icons">
        <button
            className="dark-light"
            onClick={() => navigate("/")}
          >
          <HomeIcon style={{ width: "1.3rem", height: "1.3rem" }}/>
            <span>Home</span>
            </button>
          <button
            className="dark-light msgIcon"
            onClick={() => navigate("/chat")}
          >
            <img
              src={ChatIcon}
              alt="chaticon"
              style={{ width: "1.5rem", height: "1.5rem" }}
            />
            {unseenMessage.length ? <h1>{unseenMessage.length}</h1> : null}
            <span>Chats</span>
          </button>
          <button className="dark-light" onClick={() => setDark(!dark)}>
            {dark ? (
              <Day style={{ width: "1.3rem", height: "1.3rem" }} />
            ) : (
              <Dark style={{ width: "1.3rem", height: "1.3rem" }} />
            )}
            <span>Mode</span>
          </button>
          <button
            className="dark-light msgIcon"
            onClick={() => navigate("/")}
          >
            <img
              src={ProfileIcon}
              alt="chaticon"
              style={{ width: "1.5rem", height: "1.5rem" }}
            />
            {unseenMessage.length ? <h1>{unseenMessage.length}</h1> : null}
            <span>Profile</span>
          </button>
          <button
            className="dark-light"
            onClick={() => dispatch(logoutRequest())}
          >
            <Logout style={{ width: "1.3rem", height: "1.3rem" }} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
