import React from "react";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="  flex min-h-screen">
      <Sidebar />

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
