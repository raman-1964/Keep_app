import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  // const location  = use

  const { unseenMessage } = useSelector((state) => state.messageReducer);
  // const [dark, setDark] = useState(false);

  // useEffect(() => {
  //   if (dark) document.body.style.backgroundColor = "black";
  //   return () => (document.body.style.backgroundColor = null);
  // }, [dark]);

  useEffect(() => {
    dispatch(getAllUnseenMessageRequest());
  }, []);

  return (
    <>
      <nav className={styles.navbar}>
        <Logo />
        <div className={styles.icons}>
          {/* <button className={styles.btn" onClick={() => navigate("/")}>
            <HomeIcon style={{ width: "1.3rem", height: "1.3rem" }} />
            <span>Home</span>
          </button> */}
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
          {/* <Button className={styles.btn" onClick={() => setDark(!dark)}>
            {dark ? (
              <Day style={{ width: "1.3rem", height: "1.3rem" }} />
            ) : (
              <Dark style={{ width: "1.3rem", height: "1.3rem" }} />
            )}
            <span>Mode</span>
          </Button>*/}
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
    </>
  );
}

export default Navbar;
