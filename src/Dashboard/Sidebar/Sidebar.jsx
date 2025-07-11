import React, { useState } from "react";
import Logo from "../../Shared/Logo/Logo";
import { AiOutlineBars } from "react-icons/ai";
import { NavLink, Outlet } from "react-router";

const Sidebar = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col  ">
        {/* Navbar */}
        <div className="navbar bg-gray-200 w-full lg:hidden  ">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px- lg:hidden">Dashboard</div>
        </div>
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-gray-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}

          <Logo />
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-medicine">Manage Medicine</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/ask-advertisement">
              Ask For Advertisement
            </NavLink>
          </li>

          {/* )} */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
