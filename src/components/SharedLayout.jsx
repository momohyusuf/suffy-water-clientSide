import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";

const SharedLayout = () => {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default SharedLayout;
