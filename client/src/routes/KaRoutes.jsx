import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/Home";
import ChatPage from "../pages/ChatPage/ChatPage";
import Navbar from "../components/Navbar";

function KaRoutes() {
  const { userToken } = useSelector((state) => state.loginReducer);
  const checkAuthentication = () => {
    if (userToken) return true;
    return false;
  };

  return checkAuthentication() ? (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    </>
  ) : (
    <Navigate to="/login-signup" />
  );
}

export default KaRoutes;
