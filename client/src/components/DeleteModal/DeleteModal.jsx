import React from "react";
import { ReactComponent as Warning } from "../../assets/svg/warning.svg";
import styles from "./DeleteModal.module.css";
import Button from "../../widgets/Button/Button";

const DeleteModal = ({
  deleteLoading,
  setDeleteModal,
  title,
  deleteFunction,
}) => {
  return (
    <div className={styles.modalContainer}>
      <Warning style={{ width: "4rem" }} />
      <h1 className={`modalHeading ${styles.heading}`}>
        {title}
        {}
      </h1>
      <div className={styles.btnCnt}>
        <Button
          className={styles.ysBtn}
          loading={deleteLoading}
          onClick={() => deleteFunction()}
        >
          Yes
        </Button>
        {!deleteLoading ? (
          <Button
            className={styles.noBtn}
            onClick={() => setDeleteModal(false)}
          >
            NO
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default DeleteModal;
