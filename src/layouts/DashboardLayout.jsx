import React from "react";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="   md:flex min-h-screen">
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;
