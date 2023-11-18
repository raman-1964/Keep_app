import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notesIcon from "../../assets/img/notesIcon.png";
import ChatIcon from "../../assets/img/chatIcon.png";
import DashboardIcon from "../../assets/img/dashboardIcon.png";
import Logo from "../Logo/Logo";
import { getAllUnseenMessageRequest } from "../../store/Actions/messageAction";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import Button from "../../widgets/Button/Button";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { unseenMessage } = useSelector((state) => state.messageReducer);

  useEffect(() => {
    dispatch(getAllUnseenMessageRequest());
  }, []);

  const loggedInUser = localStorage.getItem("Raman-Keep-Username");

  return (
    <>
      {loggedInUser ? (
        <nav className={styles.navbar}>
          <Logo />

          <div className={styles.icons}>
            <Button
              className={`${styles.btn} ${styles.msgIcon}`}
              onClick={() => navigate("/home")}
            >
              <img
                src={notesIcon}
                alt="notesIcon"
                style={{ width: "1.5rem", height: "1.5rem" }}
              />
              <span>Notes</span>
            </Button>
            <Button
              className={`${styles.btn} ${styles.msgIcon}`}
              onClick={() => navigate("/chat")}
            >
              <img
                src={ChatIcon}
                alt="chaticon"
                style={{ width: "1.5rem", height: "1.5rem" }}
              />
              {unseenMessage.length ? <h1>{unseenMessage.length}</h1> : null}
              <span>Chats</span>
            </Button>
            <Button
              className={`${styles.btn} ${styles.msgIcon}`}
              onClick={() => navigate("/dashboard")}
            >
              <img
                src={DashboardIcon}
                alt="ProfileIcon"
                style={{ width: "1.5rem", height: "1.5rem" }}
              />
              <span>Dashboard</span>
            </Button>
          </div>
        </nav>
      ) : (
        <nav className={`${styles.navbar} ${styles.landingpageNav}`}>
          <Logo />
          <div className={styles.icons}>
            <Button
              className={`${styles.landingPageNavbtn} `}
              onClick={() => navigate("/login-signup")}
            >
              Login / Signup
            </Button>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
