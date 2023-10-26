import React, { useState } from "react";
import { ReactComponent as UpArrow } from "../../assets/svg/up-arrow.svg";
import { ReactComponent as VerticalDot } from "../../assets/svg/verticalDot.svg";
import { ReactComponent as Delete } from "../../assets/svg/delete.svg";
import Share from "../../assets/img/share.png";
import styles from "./NoteDropdown.module.css";
import DropDown from "../../widgets/DropDown/DropDown";
import Modal from "../../widgets/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFolderRequest,
  removeShareFolderRequest,
} from "../../store/Actions/folderAction";
import SharedWith from "./components/SharedWith";
import { folderType } from "../../utils/constants";
import DeleteModal from "../DeleteModal/DeleteModal";

const NoteDropdown = ({ type, selectedFolder, setSelectedFolder }) => {
  const dispatch = useDispatch();

  const { folders, deleteFolderLoading } = useSelector(
    (state) => state.folderReducer
  );

  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteOrSharedFolder, setDeleteOrSharedFolder] = useState(null);
  const [shareModal, setShareModal] = useState(false);

  const showcontent = () => {
    setShow((prev) => !prev);
  };

  const deleteYes = () => {
    const query = {
      _id: deleteOrSharedFolder._id,
      type,
      setDeleteModal,
      ...(deleteOrSharedFolder?._id === selectedFolder?._id && {
        setSelectedFolder,
        selectedFolder,
      }),
    };
    if (type === folderType.SBO) dispatch(removeShareFolderRequest(query));
    else dispatch(deleteFolderRequest(query));
    setDeleteOrSharedFolder(null);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.week} onClick={showcontent}>
          <h1>
            {type === folderType.PRS
              ? "Personal"
              : type === folderType.SBO
              ? "Shared (by others)"
              : "Shared (by you)"}
          </h1>
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
                      setDeleteOrSharedFolder(folder);
                    }}
                  >
                    <Delete />
                    <h1 className={styles.dropDownContentheading}>
                      {type === folderType.SBO ? "Remove Out" : "Delete"}
                    </h1>
                  </div>
                  {type !== folderType.SBO ? (
                    <div
                      className={styles.dropDownContent}
                      onClick={() => {
                        setShareModal(true);
                        setDeleteOrSharedFolder(folder);
                      }}
                    >
                      <img src={Share} />
                      <h1 className={styles.dropDownContentheading}>Share</h1>
                    </div>
                  ) : null}
                </DropDown>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isModal={deleteModal} className="modal">
        <DeleteModal
          deleteFunction={deleteYes}
          setDeleteModal={setDeleteModal}
          deleteLoading={deleteFolderLoading}
          title={
            type === folderType.SBO
              ? "Are you certain you wish to remove out from this folder?"
              : "Are you sure you want to delete it?"
          }
        />
      </Modal>

      <Modal
        isModal={shareModal}
        className="modal"
        showCloseButton
        onClose={() => setShareModal(false)}
      >
        <SharedWith
          folder={deleteOrSharedFolder}
          type={type}
          setShareModal={setShareModal}
          setDeleteOrSharedFolder={setDeleteOrSharedFolder}
        />
      </Modal>
    </>
  );
};

export default NoteDropdown;
