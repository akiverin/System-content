import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const user = useSelector((state) => state.auth.user.isAuthenticated);

  return user ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
