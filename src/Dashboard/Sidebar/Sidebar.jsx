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
        <div className="navbar bg-base-300 w-full lg:hidden">
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
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}

          <Logo />
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-medicine">Manage Medicine</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentHistory">Payment History</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/track/:id">Track a Package</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile">Update Profile</NavLink>
          </li>

          {/* rider link */}
          {/* {!roleLoading && role === "rider" && ( */}
          <>
            <li>
              <NavLink to="/dashboard/pending-deliveries">
                Pending Deliveries
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/completed-deliveries">
                Completed Deliveries
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-earnings">My Earnings</NavLink>
            </li>
          </>
          {/* )} */}

          {/* admin link */}
          {/* {!roleLoading && role === "admin" && ( */}
          <>
            <li>
              <NavLink to="/dashboard/assign-rider">Assign Rider</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/activeRiders">Active Riders</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/pendingRiders">Pending Riders</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/makeAdmin">Make Admin</NavLink>
            </li>
          </>
          {/* )} */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
