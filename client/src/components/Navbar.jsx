import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as Dark } from "../assets/dark.svg";
import { ReactComponent as Day } from "../assets/day.svg";
import { ReactComponent as Logout } from "../assets/logout.svg";
import { logoutRequest } from "../store/Actions/loginAction";
import Logo from "./Logo";

function Navbar() {
  const [dark, setDark] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (dark) document.body.style.backgroundColor = "black";
    return () => (document.body.style.backgroundColor = null);
  }, [dark]);
  return (
    <>
      <nav className="navbar">
        <Logo />
        <div className="icons">
          <button className="dark-light" onClick={() => setDark(!dark)}>
            {dark ? (
              <Day style={{ width: "1.3rem" }} />
            ) : (
              <Dark style={{ width: "1.3rem" }} />
            )}
          </button>
          <button
            className="dark-light"
            onClick={() => dispatch(logoutRequest())}
          >
            <Logout style={{ width: "1.3rem" }} />
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
