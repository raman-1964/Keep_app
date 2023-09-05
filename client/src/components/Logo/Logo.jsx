import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logo.css";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className="logo" onClick={() => navigate("/")}>
      <h1>rk</h1>
      <h2>raman keep</h2>
    </div>
  );
};

export default Logo;
