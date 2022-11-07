import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { admin } = useSelector((state) => state.admin);
  return admin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
