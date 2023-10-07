import React, { useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import authHeader from "../../../services/auth-header";
import { useDispatch } from "react-redux";
import { createChatRequest } from "../../../store/Actions/chatAction";
import { debounceSearch } from "../../../utils/debounce";
import styles from ".././NoteDropdown.module.css";
import { ReactComponent as Close } from "../../../assets/svg/close.svg";
const BASE_URL = process.env.REACT_APP_URL;

const SharedWith = ({ setSelectedChat }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [sharedTo, setSharedTo] = useState([]);

  const promiseOptions = async (inputValue) => {
    return await axios
      .get(`${BASE_URL}/user/search?user=${inputValue}`, {
        headers: { ...authHeader() },
      })
      .then((response) => {
        const arrayMap = response.data.map((data) => {
          return { label: data.username, _id: data._id };
        });
        return arrayMap;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    setSharedTo((prev) => {
      return [...prev, { name: e.label, _id: e._id }];
    });
  };

  return (
    <div className={styles.sharedWithCont}>
      <AsyncSelect
        loadOptions={debounceSearch(promiseOptions, 1000)}
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search to share"
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border: "2px solid #b1a2eb",
            paddingLeft: "1rem",
            borderRadius: "0.5rem",
            fontSize: "1.1rem",
            fontWeight: "400",
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            fontSize: "1.1rem",
          }),
        }}
        noOptionsMessage={({ inputValue }) =>
          !inputValue ? (
            "Please enter keyword to search"
          ) : (
            <p>No results found!</p>
          )
        }
      />

      <div className={styles.sharedPersonCont}>
        {[...Array(20).keys()].map(() => (
          <div className={styles.sharedPerson}>
            <p>_rohan_</p>
            <div className={styles.sharedPersonClose}>
              <Close />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedWith;
