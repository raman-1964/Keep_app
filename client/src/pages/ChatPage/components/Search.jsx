import React from "react";
import SelectAsync from "../../../components/SelectAsync/SelectAsync";
import { useDispatch } from "react-redux";
import { createChatRequest } from "../../../store/Actions/chatAction";

const Search = ({ setSelectedChat }) => {
  const dispatch = useDispatch();

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
      <SelectAsync onChange={handleSearch} />
    </div>
  );
};

export default Search;
