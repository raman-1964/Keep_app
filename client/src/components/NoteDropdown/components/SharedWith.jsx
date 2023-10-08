import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import authHeader from "../../../services/auth-header";
import { useDispatch, useSelector } from "react-redux";
import { debounceSearch } from "../../../utils/debounce";
import styles from ".././NoteDropdown.module.css";
import { ReactComponent as Close } from "../../../assets/svg/close.svg";
import Button from "../../../widgets/Button/Button";
import { shareFolderRequest } from "../../../store/Actions/folderAction";
const BASE_URL = process.env.REACT_APP_URL;

const SharedWith = ({
  type,
  folder,
  setShareModal,
  setDeleteOrSharedFolder,
}) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [willShared, setWillShared] = useState([]);
  const [sharedTo, setSharedTo] = useState([]);
  const [allId, setAllId] = useState([]);

  const { shareFolderLoading } = useSelector((state) => state.folderReducer);

  const promiseOptions = async (inputValue) => {
    return await axios
      .get(`${BASE_URL}/user/search?user=${inputValue}`, {
        headers: { ...authHeader() },
        params: { allId },
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
    setWillShared((prev) => {
      return [...prev, { username: e.label, _id: e._id }];
    });
    setAllId((prev) => {
      return [...prev, e._id];
    });
  };

  const filterShared = (id, str) => {
    if (str === "to")
      setSharedTo((prev) => {
        return prev.filter((prs) => prs._id !== id);
      });
    else
      setWillShared((prev) => {
        return prev.filter((prs) => prs._id !== id);
      });
    if (allId.includes(id))
      setAllId((prev) => {
        return prev.filter((item) => item !== id);
      });
  };

  const sharePersonList = (array, str) => {
    return (
      <>
        <p className={styles.sharedTitle}>
          {str === "to" ? "Shared To" : "Will Shared"}
        </p>
        <div className={styles.sharedPersonCont}>
          {array.map((person) => (
            <div key={person._id} className={styles.sharedPerson}>
              <p>{person.username}</p>
              <div
                className={styles.sharedPersonClose}
                onClick={() => filterShared(person._id, str)}
              >
                <Close />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const shareBtn = () => {
    dispatch(
      shareFolderRequest({
        _id: folder?._id,
        arr: allId,
        type,
        setShareModal,
        setDeleteOrSharedFolder,
      })
    );
  };

  useEffect(() => {
    if (folder?._id) {
      setSharedTo(folder.sharedTo);
      setAllId((prev) => {
        return [...prev, ...folder.sharedTo.map((prs) => prs._id)];
      });
    }
  }, [folder?._id]);

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

      {sharedTo.length ? sharePersonList(sharedTo, "to") : null}
      {willShared.length ? sharePersonList(willShared) : null}

      <Button
        spinnerTheme="light"
        loading={shareFolderLoading}
        onClick={() => shareBtn()}
      >
        Share
      </Button>
    </div>
  );
};

export default SharedWith;
