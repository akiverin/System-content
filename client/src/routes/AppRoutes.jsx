import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/";
import Profile from "../pages/Profile/";
import Auth from "../pages/Auth";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default AppRoutes;
