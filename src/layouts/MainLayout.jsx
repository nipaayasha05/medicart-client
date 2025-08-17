import React from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/footer/Footer";
import Loader from "../components/Loader";

const MainLayout = () => {
  const { state } = useNavigate();
  return (
    <div className="font-alata-regular">
      <Navbar></Navbar>
      <div className="pt-24 min-h-[calc(100vh-288px)] ">
        {state == "loading" ? <Loader /> : <Outlet></Outlet>}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
