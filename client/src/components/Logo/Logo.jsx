import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Logo.module.css";
import LogoSS from "../../assets/img/logo.png";

const Logo = ({ setActivePage = null }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.logo}
      onClick={() => {
        if (setActivePage) setActivePage("/");
        navigate("/");
      }}
    >
      <img src={LogoSS} alt="logo-image" />
      <h2>Guftagu</h2>
    </div>
  );
};

export default Logo;
