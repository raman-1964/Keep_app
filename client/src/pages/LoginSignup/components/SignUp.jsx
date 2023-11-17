import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupRequest } from "../../../store/Actions/loginAction";
import { signUpAllValidation } from "../../../utils/validation";
import Button from "../../../widgets/Button/Button";
import Input from "../../../widgets/Input/Input";
import Logo from "../../../components/Logo/Logo";
import hidePassword from "../../../assets/img/hidePassword.png";
import showPassword from "../../../assets/img/showPassword.png";
import UserName from "../../../components/userName/UserName";

function SignUp({ setLoginToggle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [seePassword, setSeePassword] = useState(false);
  const [signUp, setSignUp] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    name: "",
    password: "",
    username: "",
  });

  const { userToken, signupLoading } = useSelector(
    (state) => state.loginReducer
  );

  const signup = (e) => {
    console.log(signUp);
    const { isValid, errors } = signUpAllValidation(signUp);
    if (isValid) dispatch(signupRequest(signUp));
    setError(errors);
  };

  useEffect(() => {
    if (userToken) navigate("/home");
  }, [userToken]);

  // console.log(suggestedUserName);

  return (
    <>
      <div className="login-container">
        <Logo />
        <UserName value={signUp} setValue={setSignUp} error={error} />
        <div className="log-input">
          <h1>Name</h1>
          <Input
            type="text"
            placeholder="Enter your name"
            autoComplete="off"
            name="name"
            value={signUp}
            setValue={setSignUp}
          />
          <p className="error">
            {error && error["name"] ? error["name"][0] : ""}
          </p>
        </div>
        <div className="log-input">
          <h1>Email</h1>
          <Input
            type="text"
            placeholder="Enter your email"
            autoComplete="off"
            name="email"
            value={signUp}
            setValue={setSignUp}
          />
          <p className="error">
            {error && error["email"] ? error["email"][0] : ""}
          </p>
        </div>
        <div className="log-input">
          <h1>Password</h1>
          <Input
            type={seePassword ? "text" : "password"}
            placeholder="Enter your password"
            autoComplete="off"
            name="password"
            value={signUp}
            setValue={setSignUp}
            onKeyDown={(e) => e.key === "Enter" && signup(e)}
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
            Have an account?
            <span onClick={() => setLoginToggle(true)}> Login</span>
          </p>
        </div>

        <Button
          className="loginButton"
          loading={signupLoading}
          onClick={(e) => signup(e)}
          spinnerTheme="light"
        >
          SignUp
        </Button>
      </div>
    </>
  );
}

export default SignUp;
