import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupRequest } from "../../../store/Actions/loginAction";
import { signUpAllValidation } from "../../../utils/validation";
import Button from "../../../widgets/Button";
import Input from "../../../widgets/Input";
import Logo from "../../../components/Logo/Logo";
import hidePassword from "../../../assets/img/hidePassword.png";
import showPassword from "../../../assets/img/showPassword.png";

function SignUp({ setLoginToggle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [seePassword, setSeePassword] = useState(false);
  const [signUp, setsignUp] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    name: "",
    password: "",
  });

  const { userToken, signupLoading } = useSelector(
    (state) => state.loginReducer
  );

  const signup = (e) => {
    console.log(signUp);
    // e.preventDefault();
    const { isValid, errors } = signUpAllValidation(signUp);
    if (isValid) dispatch(signupRequest(signUp));
    setError(errors);
  };

  useEffect(() => {
    if (userToken) navigate("/");
  }, [userToken]);

  return (
    <>
      <div className="login-container">
        <Logo />
        <div className="log-input">
          <h1>User name</h1>
          <Input
            type="text"
            placeholder="Choose unique username"
            autoComplete="off"
            name="username"
            value={signUp}
            setValue={setsignUp}
          />
          <p className="error">
            {error && error["name"] ? error["name"][0] : ""}
          </p>
        </div>
        <div className="log-input">
          <h1>Name</h1>
          <Input
            type="text"
            placeholder="Enter your name"
            autoComplete="off"
            name="name"
            value={signUp}
            setValue={setsignUp}
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
            setValue={setsignUp}
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
            setValue={setsignUp}
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
        >
          SignUp
        </Button>
      </div>
    </>
  );
}

export default SignUp;
