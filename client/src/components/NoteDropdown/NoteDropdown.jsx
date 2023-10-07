import React, { useState } from "react";
import { ReactComponent as UpArrow } from "../../assets/svg/up-arrow.svg";
import { ReactComponent as VerticalDot } from "../../assets/svg/verticalDot.svg";
import { ReactComponent as Delete } from "../../assets/svg/delete.svg";
import { ReactComponent as Warning } from "../../assets/svg/warning.svg";
import Share from "../../assets/img/share.png";
import styles from "./NoteDropdown.module.css";
import DropDown from "../../widgets/DropDown/DropDown";
import Modal from "../../widgets/Modal/Modal";
import Button from "../../widgets/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFolderRequest,
  getAllFolderRequest,
} from "../../store/Actions/folderAction";
import Spinner from "../Spinner/Spinner";
import SharedWith from "./components/SharedWith";

const NoteDropdown = ({ type, selectedFolder, setSelectedFolder }) => {
  const dispatch = useDispatch();

  const { folders, folderLoading, deleteFolderLoading } = useSelector(
    (state) => state.folderReducer
  );

  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteOrSharedFolder, setDeleteOrSharedFolder] = useState(null);
  const [shareModal, setShareModal] = useState(false);

  const showcontent = () => {
    if (!show) dispatch(getAllFolderRequest({ type }));
    setShow((prev) => !prev);
  };

  console.log("folders", folders);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.week} onClick={showcontent}>
          <h1>{type}</h1>
          <div className={styles.image}>
            <UpArrow
              style={{
                color: "black",
                ...(show && {
                  transform: "rotate(180deg)",
                }),
              }}
            />
          </div>
        </div>

        <div className={`${styles.content}`}>
          {folderLoading[type] && show ? (
            <div className={styles.folderLoading}>
              <Spinner theme="light" />
            </div>
          ) : (
            <div
              className={`noscrollbar ${show && styles.contentShow}  ${
                styles.contentHide
              }`}
            >
              {folders[type]?.map((folder, ind) => (
                <div key={ind} className={`${styles.single} `}>
                  <div
                    className={`${styles.singleContent}`}
                    onClick={() => setSelectedFolder(folder)}
                  >
                    <span
                      className={`${
                        selectedFolder?._id === folder._id
                          ? styles.nowSeeing
                          : null
                      }`}
                    ></span>
                    <h2>{folder?.name}</h2>
                  </div>
                  <DropDown right="0" width="10rem" btn={<VerticalDot />}>
                    <div
                      className={styles.dropDownContent}
                      onClick={() => {
                        setDeleteModal(true);
                        setDeleteOrSharedFolder(folder._id);
                      }}
                    >
                      <Delete />
                      <h1 className={styles.dropDownContentheading}>Delete</h1>
                    </div>
                    <div
                      className={styles.dropDownContent}
                      onClick={() => setShareModal(true)}
                    >
                      <img src={Share} />
                      <h1 className={styles.dropDownContentheading}>Share</h1>
                    </div>
                  </DropDown>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal isModal={deleteModal} className="modal">
        <div className={styles.modalContainer}>
          <Warning style={{ width: "4rem" }} />
          <h1 className={`modalHeading ${styles.heading}`}>
            Are you sure you want to delete it?
          </h1>
          <div className={styles.btnCnt}>
            <Button
              className={styles.ysBtn}
              loading={deleteFolderLoading}
              onClick={() =>
                dispatch(
                  deleteFolderRequest({
                    _id: deleteOrSharedFolder,
                    type,
                    setDeleteModal,
                    ...(deleteOrSharedFolder === selectedFolder?._id && {
                      setSelectedFolder,
                      selectedFolder,
                    }),
                  })
                )
              }
            >
              Yes
            </Button>
            {!deleteFolderLoading ? (
              <Button
                className={styles.noBtn}
                onClick={() => setDeleteModal(false)}
              >
                NO
              </Button>
            ) : null}
          </div>
        </div>
      </Modal>

      <Modal
        isModal={shareModal}
        className="modal"
        showCloseButton
        onClose={() => setShareModal(false)}
      >
        <SharedWith />
      </Modal>
    </>
  );
};

export default NoteDropdown;
