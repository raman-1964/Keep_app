import React, { useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import authHeader from "../../../services/auth-header";
import { useDispatch } from "react-redux";
import { createChatRequest } from "../../../store/Actions/chatAction";
const BASE_URL = process.env.REACT_APP_URL;

const Search = ({ setSelectedChat }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

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

  const debounceSearch = (f, interval) => {
    let timer = null;

    return (...args) => {
      clearTimeout(timer);
      return new Promise((resolve) => {
        timer = setTimeout(() => resolve(f(...args)), interval);
      });
    };
  };

  const handleSearch = (e) => {
    dispatch(createChatRequest({ userId: e._id, setSelectedChat }));
  };

  return (
    <div
      style={{
        width: "100%",
        marginBottom: "1rem",
      }}
    >
      <AsyncSelect
        loadOptions={debounceSearch(promiseOptions, 1000)}
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search to chat"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: "2px solid #0ce72d",
            paddingLeft: "2.5rem",
            borderRadius: "15px",
            fontSize: "1.1rem",
            fontWeight: "400",
            // background: "#242323",
            // color: "#fff",
          }),
          menu: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: "1.1rem",
          }),
        }}
        noOptionsMessage={({ inputValue }) =>
          !inputValue ? (
            "Please enter keyword to search"
          ) : (
            <button>No results found!</button>
          )
        }
      />
    </div>
  );
};

export default Search;
