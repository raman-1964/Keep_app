import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupRequest } from "../store/Actions/loginAction";
import { signUpAllValidation } from "../utils/validation";
import Button from "../widgets/Button";
import Input from "../widgets/Input";
import Logo from "./Logo";

function SignUp({ setLoginToggle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUp, setsignUp] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    name: "",
    password: "",
  });

  const { userToken } = useSelector((state) => state.loginReducer);

  const signup = (e) => {
    e.preventDefault();
    const { isValid, errors } = signUpAllValidation(signUp);
    if (isValid) dispatch(signupRequest(signUp));
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
              type="text"
              placeholder="Enter your password"
              autoComplete="off"
              name="password"
              value={signUp}
              setValue={setsignUp}
              onKeyDown={(e) => e.key === "Enter" && signup(e)}
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

          <Button onClick={(e) => signup(e)}>SignUp</Button>
        </div>
      </div>
    </>
  );
}

export default SignUp;
