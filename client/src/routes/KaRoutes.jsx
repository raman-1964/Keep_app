import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/Home/Home";
import ChatPage from "../pages/ChatPage/ChatPage";
import Navbar from "../components/Navbar/Navbar";
import Dashboard from "../pages/Dashboard/Dashboard";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import CallerPage from "../pages/CallerPage/CallerPage";
import LandingPage from "../pages/LandingPage/LandingPage";

function KaRoutes() {
  const { userToken } = useSelector((state) => state.loginReducer);
  const checkAuthentication = () => {
    if (userToken) return true;
    return false;
  };
//checkAuthentication() ? 
  return checkAuthentication()? (
    <>
      <Navbar />

      <div>
        <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/call/:user" element={<CallerPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  ) 
  : (
    <Navigate to="/login-signup" />
  );
}

export default KaRoutes;
