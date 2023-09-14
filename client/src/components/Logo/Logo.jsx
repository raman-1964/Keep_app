import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logo.css";
import LogoSS from "../../assets/img/logo.png";


const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className="logo" onClick={() => navigate("/")}>
      <img src={LogoSS} alt="logo-image"/>
      <h2>Guftagu</h2>
    </div>
  );
};

export default Logo;
