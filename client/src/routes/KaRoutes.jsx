import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/Home";

function KaRoutes() {
  const { userToken } = useSelector((state) => state.loginReducer);
  const checkAuthentication = () => {
    if (userToken) return true;
    return false;
  };

  return checkAuthentication() ? (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  ) : (
    <Navigate to="/login-signup" />
  );
}

export default KaRoutes;
