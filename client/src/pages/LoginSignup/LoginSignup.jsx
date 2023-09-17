import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import "./LoginSignup.css";
import { ReactComponent as LoginSideImg } from "../../assets/svg/LoginSideImg.svg";

function LoginSignup() {
  const [toggle, setToggle] = useState(true);

  // const { userToken } = useSelector((state) => state.loginReducer);

  // useEffect(() => {
  //   setToggle(true);
  // }, [userToken]);

  return (
    <>
      <div className="log-container">
        <div className="sideimgandformContainer">
          <div className="side-img">
            <LoginSideImg className="svgimg" />
          </div>
          {toggle ? (
            <Login setLoginToggle={setToggle} />
          ) : (
            <SignUp setLoginToggle={setToggle} />
          )}
        </div>
      </div>
    </>
  );
}

export default LoginSignup;
