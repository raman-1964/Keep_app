import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../../assets/svg/close.svg";
import { shareFolderRequest } from "../../../store/Actions/folderAction";
import SelectAsync from "../../../components/SelectAsync/SelectAsync";
import Button from "../../../widgets/Button/Button";
import styles from "../NoteDropdown.module.css";

const SharedWith = ({
  type,
  folder,
  setShareModal,
  setDeleteOrSharedFolder,
}) => {
  const dispatch = useDispatch();

  const [willShared, setWillShared] = useState([]);
  const [sharedTo, setSharedTo] = useState([]);
  const [allId, setAllId] = useState([]);

  const { shareFolderLoading } = useSelector((state) => state.folderReducer);

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
      <SelectAsync onChange={handleSearch} allId={allId} />

      {sharedTo.length ? sharePersonList(sharedTo, "to") : null}
      {willShared.length ? sharePersonList(willShared) : null}

      <div className={styles.btnCont}>
        <Button
          spinnerTheme="light"
          loading={shareFolderLoading}
          onClick={() => shareBtn()}
        >
          Share
        </Button>
      </div>
    </div>
  );
};

export default SharedWith;
