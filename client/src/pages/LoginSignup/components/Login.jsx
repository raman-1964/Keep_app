import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../../store/Actions/loginAction";
import { loginAllValidation } from "../../../utils/validation";
import Button from "../../../widgets/Button/Button";
import Input from "../../../widgets/Input/Input";
import Logo from "../../../components/Logo/Logo";
import hidePassword from "../../../assets/img/hidePassword.png";
import showPassword from "../../../assets/img/showPassword.png";

function Login({ setLoginToggle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [seePassword, setSeePassword] = useState(false);

  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });

  const [error, setError] = useState({
    identifier: "",
    password: "",
  });

  const { userToken, loginLoading } = useSelector(
    (state) => state.loginReducer
  );

  const login = (e) => {
    e.preventDefault();
    const { isValid, errors } = loginAllValidation(loginData);
    if (isValid) dispatch(loginRequest(loginData));
    setError(errors);
  };

  useEffect(() => {
    if (userToken) navigate("/home");
  }, [userToken]);

  return (
    <>
      <div className="login-container">
        <Logo />
        <div className="log-input">
          <h1>Email or UserName</h1>
          <Input
            type="text"
            placeholder="Enter your email or username"
            autoComplete="off"
            name="identifier"
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
            className="input"
            type={seePassword ? "text" : "password"}
            placeholder="Enter your password"
            autoComplete="off"
            name="password"
            value={loginData}
            setValue={setLoginData}
            onKeyDown={(e) => e.key === "Enter" && login(e)}
          />

          <img
            src={seePassword ? hidePassword : showPassword}
            alt="ShowHideEye"
            onClick={() => setSeePassword(!seePassword)}
            className="seeOrHidePassword"
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

        <Button
          className="loginButton"
          loading={loginLoading}
          onClick={(e) => login(e)}
          spinnerTheme="light"
        >
          Log In
        </Button>
      </div>
    </>
  );
}

export default Login;
