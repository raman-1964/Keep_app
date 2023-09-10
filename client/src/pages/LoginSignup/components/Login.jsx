import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../../store/Actions/loginAction";
import { loginAllValidation } from "../../../utils/validation";
import Button from "../../../widgets/Button";
import Input from "../../../widgets/Input";
import Logo from "../../../components/Logo/Logo";
import hidePassword from "../../../assets/img/hidePassword.png";
import showPassword from "../../../assets/img/showPassword.png";
import { ReactComponent as LoginSideImg } from "../../../assets/svg/LoginSideImg.svg";

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
    console.log("hello", isValid);
    if (isValid) dispatch(loginRequest(loginData));
    setError(errors);
  };

  useEffect(() => {
    if (userToken) navigate("/");
  }, [userToken]);

  return (
    <>
      <div className="log-container">
        <div className="sideimgandformContainer">
          <div className="side-img">
            <LoginSideImg className="svgimg" />
          </div>
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
                {error && error["identifier"] ? error["identifier"][0] : ""}
              </p>
            </div>
            <div className="log-input">
              <h1>Password</h1>
              <Input
                type={seePassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="off"
                name="password"
                value={loginData}
                setValue={setLoginData}
                onKeyDown={(e) => e.key === "Enter" && login(e)}
              />
              {seePassword ? (
                <img
                  src={hidePassword}
                  alt="hideEye"
                  onClick={() => setSeePassword(!seePassword)}
                  className="seeOrHidePassword"
                />
              ) : (
                <img
                  src={showPassword}
                  alt="hideEye"
                  onClick={() => setSeePassword(!seePassword)}
                  className="seeOrHidePassword"
                />
              )}
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
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
