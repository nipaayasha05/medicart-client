import React from "react";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import { Outlet } from "react-router";
import DashboardFooter from "../Dashboard/DashboardFooter/DashboardFooter";

const DashboardLayout = () => {
  return (
    <div>
      <div className="   md:flex min-h-screen">
        <Sidebar />
      </div>
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;
