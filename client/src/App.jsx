import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup";
import KaRoutes from "./routes/KaRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login-signup" exact element={<LoginSignup />} />
          <Route path="/*" element={<KaRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
