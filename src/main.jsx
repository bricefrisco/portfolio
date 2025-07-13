import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
