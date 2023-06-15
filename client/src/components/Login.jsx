import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../store/Actions/loginAction";
import { loginAllValidation } from "../utils/validation";
import Button from "../widgets/Button";
import Input from "../widgets/Input";
import Logo from "./Logo";

function Login({ setLoginToggle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const { userToken, loginLoading } = useSelector((state) => state.loginReducer);

  const login = (e) => {
    e.preventDefault();
    const { isValid, errors } = loginAllValidation(loginData);
    if (isValid) dispatch(loginRequest(loginData));
    setError(errors);
  };

  useEffect(() => {
    if (userToken) navigate("/");
  }, [userToken]);

  return (
    <>
      <div className="log-container">
        <div className="login">
          <Logo />
          <div className="log-input">
            <h1>Email</h1>
            <Input
              type="text"
              placeholder="Enter your email"
              autoComplete="off"
              name="email"
              value={loginData}
              setValue={setLoginData}
            />
            <p className="error">
              {error && error["email"] ? error["email"][0] : ""}
            </p>
          </div>
          <div className="log-input">
            <h1>Password</h1>
            <Input
              type="text"
              placeholder="Enter your password"
              autoComplete="off"
              name="password"
              value={loginData}
              setValue={setLoginData}
              onKeyDown={(e) => e.key === "Enter" && login(e)}
            />
            <p className="error">
              {error && error["password"] ? error["password"][0] : ""}
            </p>
          </div>
          <div className="login-to-signup">
            <p>
              Don't have an account?
              <span onClick={() => setLoginToggle(false)}> Sign up</span>
            </p>
          </div>

          <Button className="loginButton" loading={loginLoading} onClick={(e) => login(e)}>Login</Button>
        </div>
      </div>
    </>
  );
}

export default Login;
