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

const NoteDropdown = ({}) => {
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(-1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  const showcontent = () => {
    setShow(!show);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.week} onClick={showcontent}>
          <h1>Personal</h1>
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
            {[...Array(5).keys()].map((_, ind) => (
              <div key={ind} className={`${styles.single} `}>
                <div
                  className={`${styles.singleContent} flex a-center`}
                  onClick={() => setIndex(ind)}
                >
                  <span
                    className={`${index === ind ? styles.nowSeeing : null}`}
                  ></span>
                  <h2>Hii Raman</h2>
                </div>
                <DropDown right="0" width="10rem" btn={<VerticalDot />}>
                  <div
                    className={styles.dropDownContent}
                    onClick={() => setDeleteModal(true)}
                  >
                    <Delete />
                    <h1 className={styles.dropDownContentheading}>Delete</h1>
                  </div>
                  <div className={styles.dropDownContent}>
                    <img src={Share} />
                    <h1 className={styles.dropDownContentheading}>Share</h1>
                  </div>
                </DropDown>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isModal={deleteModal} className="modal">
        <div className={styles.modalContainer}>
          <Warning style={{ width: "4rem" }} />
          <h1 className={`modalHeading ${styles.heading}`}>
            Are you sure you want to delete it?
          </h1>
          <div className={styles.btnCnt}>
            <Button className={styles.ysBtn}>Yes</Button>
            <Button
              className={styles.noBtn}
              onClick={() => setDeleteModal(false)}
            >
              NO
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NoteDropdown;
