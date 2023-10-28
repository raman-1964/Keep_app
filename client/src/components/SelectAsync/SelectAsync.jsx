import React, { useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import authHeader from "../../services/auth-header";
import { debounceSearch } from "../../utils/debounce";
const BASE_URL = process.env.REACT_APP_URL;

const SelectAsync = ({ onChange, allId = null, isProfile = false }) => {
  const [searchValue, setSearchValue] = useState("");

  const promiseOptions = async (inputValue) => {
    return await axios
      .post(
        `${BASE_URL}/user/search?user=${inputValue}`,
        { allId, isProfile },
        { headers: { ...authHeader() } }
      )
      .then((response) => {
        const arrayMap = response.data.map((data) => {
          return { label: data.username, _id: data._id };
        });
        if (isProfile) onChange(response.data);
        return arrayMap;
      })
      .catch((err) => {
        console.log(err);
      });
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
        onChange={(e) => onChange(e)}
        placeholder="Search"
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
            ...(isProfile && { display: "none" }),
          }),
        }}
        noOptionsMessage={({ inputValue }) =>
          !inputValue ? (
            "Please enter keyword to search"
          ) : (
            <button>No results found!</button>
          )
        }
        isClearable={true}
      />
    </div>
  );
};

export default SelectAsync;
