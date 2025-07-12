import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="pt-20 min-h-[calc(100vh-288px)] ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MainLayout;
