import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import "./LoginSignup.css";

function LoginSignup() {
  const [toggle, setToggle] = useState(true);

  // const { userToken } = useSelector((state) => state.loginReducer);

  // useEffect(() => {
  //   setToggle(true);
  // }, [userToken]);

  return (
    <>
      {toggle ? (
        <Login setLoginToggle={setToggle} />
      ) : (
        <SignUp setLoginToggle={setToggle} />
      )}
    </>
  );
}

export default LoginSignup;
