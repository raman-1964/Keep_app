import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupRequest } from "../../../store/Actions/loginAction";
import { signUpAllValidation } from "../../../utils/validation";
import Button from "../../../widgets/Button";
import Input from "../../../widgets/Input";
import Logo from "../../../components/Logo/Logo";
import hidePassword from "../../../assets/img/hidePassword.png";
import showPassword from "../../../assets/img/showPassword.png";
import { ReactComponent as LoginSideImg } from "../../../assets/svg/LoginSideImg.svg";
import { ReactComponent as Close } from "../../../assets/svg/close.svg";
import { debounceSearch } from "../../../utils/debounce";
import authHeader from "../../../services/auth-header";
const BASE_URL = process.env.REACT_APP_URL;

function SignUp({ setLoginToggle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const timerRef = useRef(null);
  const [suggestedUserName, setSuggestedUserName] = useState([]);
  const [availableUserName, setAvailableUserName] = useState("pending");
  const [seePassword, setSeePassword] = useState(true);
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
    // e.preventDefault();
    const { isValid, errors } = signUpAllValidation(signUp);
    if (isValid) dispatch(signupRequest(signUp));
    setError(errors);
  };

  const makeApi = debounceSearch((username) => {
    if (suggestedUserName.includes(username)) {
      setAvailableUserName("success");
      setSuggestedUserName([]);
    } else if (username.length >= 5)
      axios
        .post(
          `${BASE_URL}/auth/unique-user-name`,
          { username },
          {
            headers: { ...authHeader() },
          }
        )
        .then((res) => {
          setAvailableUserName(res.data.available);
          setSuggestedUserName(res.data.suggestedUserName);
        })
        .catch((err) => {
          console.log(err);
        });
  }, 300);

  const handleUserName = (username) => {
    setSignUp((prevState) => {
      return {
        ...prevState,
        username,
      };
    });

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => makeApi(username), 300);
  };

  useEffect(() => {
    if (userToken) navigate("/");
  }, [userToken]);

  console.log(suggestedUserName);

  return (
    <>
      <div className="log-container">
        <div className="sideimgandformContainer">
          <div className="side-img">
            <LoginSideImg className="svgimg" />
          </div>
          <div className="login-container">
            <Logo />
            <div style={{ width: "100%" }}>
              <div className="log-input">
                <h1>User name</h1>
                <Input
                  className={`${
                    availableUserName === "pending"
                      ? "normal"
                      : availableUserName === "success"
                      ? "success"
                      : "rejected"
                  }`}
                  type="text"
                  placeholder="Choose unique username"
                  autoComplete="off"
                  name="username"
                  value={signUp}
                  setValue={setSignUp}
                  onChange={(e) => handleUserName(e.target.value)}
                />
                <p className="error">
                  {error && error["username"] ? error["username"][0] : ""}
                </p>
                {availableUserName === "rejected" ? (
                  <p className="error">
                    username already taken, slect or type another
                  </p>
                ) : null}
              </div>

              {availableUserName === "rejected" &&
              suggestedUserName.length > 0 ? (
                <div className="suggestedCont ">
                  <div className="suggestedNameCont noScrollbar">
                    {suggestedUserName.map((name, ind) => (
                      <p
                        key={`userName#${ind}`}
                        className="suggestedName"
                        onClick={() => handleUserName(name)}
                      >
                        {name}
                      </p>
                    ))}
                  </div>
                  <div
                    className="closeSuggestion"
                    onClick={() => setSuggestedUserName([])}
                  >
                    <Close style={{ width: "1rem", height: "1rem" }} />
                  </div>
                </div>
              ) : null}
            </div>
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
        </div>
      </div>
    </>
  );
}

export default SignUp;
