import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login.jsx";
import "./index.css";
import Register from "./pages/Register.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
