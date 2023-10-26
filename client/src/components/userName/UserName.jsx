import React, { useRef, useState } from "react";
import axios from "axios";
import { ReactComponent as Close } from "../../assets/svg/close.svg";
import { debounceSearch } from "../../utils/debounce";
import authHeader from "../../services/auth-header";
import Input from "../../widgets/Input/Input";
import styles from "./UserName.module.css";
const BASE_URL = process.env.REACT_APP_URL;

const UserName = ({ value, setValue, error = {} }) => {
  const timerRef = useRef(null);
  const [availableUserName, setAvailableUserName] = useState("pending");
  const [suggestedUserName, setSuggestedUserName] = useState([]);

  const loggedInUserName = localStorage.getItem("Raman-Keep-Username");

  const makeApi = debounceSearch((username) => {
    if (suggestedUserName.includes(username) || loggedInUserName === username) {
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
    setValue((prevState) => {
      return {
        ...prevState,
        username,
      };
    });

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => makeApi(username), 300);
  };

  return (
    <div className={styles.cont}>
      <div className="log-input">
        <h1>User name</h1>
        <Input
          className={`${
            availableUserName === "pending"
              ? styles.normal
              : availableUserName === "success"
              ? styles.success
              : styles.rejected
          }`}
          type="text"
          placeholder="Choose unique username"
          autoComplete="off"
          name="username"
          value={value}
          setValue={setValue}
          onChange={(e) => handleUserName(e.target.value)}
        />
        <p className="error">
          {error && error["username"] ? error["username"][0] : ""}
        </p>
        {availableUserName === "rejected" ? (
          <p className="error">username already taken, slect or type another</p>
        ) : null}
      </div>

      {availableUserName === "rejected" && suggestedUserName.length > 0 ? (
        <div className={styles.suggestedCont}>
          <div className={`${styles.suggestedNameCont} noScrollbar`}>
            {suggestedUserName.map((name, ind) => (
              <p
                key={`userName#${ind}`}
                className={styles.suggestedName}
                onClick={() => handleUserName(name)}
              >
                {name}
              </p>
            ))}
          </div>
          <div
            className={styles.closeSuggestion}
            onClick={() => setSuggestedUserName([])}
          >
            <Close style={{ width: "1rem", height: "1rem" }} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserName;
