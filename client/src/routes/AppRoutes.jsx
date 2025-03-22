import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/";
import Profile from "../pages/Profile/";
import Auth from "../pages/Auth";
import Logout from "../pages/Logout";
import PrivateRoute from "@components/PrivateRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route element={<PrivateRoute />}>
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
