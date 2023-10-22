import React from "react";
import { ReactComponent as ErrorPageImg } from "../../assets/svg/ErrorPageImg.svg";
import styles from "./ErrorPage.module.css";
import Button from "../../widgets/Button/Button";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <ErrorPageImg className={styles.svgimg} />
      </div>
      <div className={styles.btnContainer}>
        <Button className={styles.btn} onClick={() => navigate("/")}>
          Go to Home
        </Button>
        <Button className={styles.btn} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
