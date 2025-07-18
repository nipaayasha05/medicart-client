import React, { useState } from "react";
import Logo from "../Logo/Logo";
import useAuth from "../../hooks/useAuth";
import { CgProfile } from "react-icons/cg";
import { Link, NavLink, useLocation } from "react-router";

const Navbar = () => {
  const { user, handleLogOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "border-b-2  border-b-sky-300  " : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? "border-b-2  border-b-sky-300" : ""
          }
        >
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "border-b-2  border-b-sky-300" : ""
          }
        >
          Cart
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/sdsh"
          className={({ isActive }) =>
            isActive ? "border-b-2  border-b-sky-300" : ""
          }
        >
          Languages dropdown
        </NavLink>
      </li>
    </>
  );
  const handleUserLogOut = () => {
    handleLogOut();
    return <Navigate to="/signin" state={pathname}></Navigate>;
  };
  return (
    <div className="navbar top-0 fixed bg-gray-50 shadow-sm  border-b-2 border-gray-300 z-10 ">
      <div className="flex  container mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="relative  z-10">
              <div onClick={() => setIsOpen(!isOpen)} className="">
                <img
                  src={user && user.photoURL}
                  className="rounded-xl w-12 h-12"
                  alt=""
                />
                {isOpen && (
                  <div
                    className="absolute  px- -mx-24 my-1 bg-base-100 rounded-xl shadow-md overflow-hidden 
              text-sm "
                  >
                    <NavLink
                      to="/dashboard"
                      className="px-4 py-3 block hover:bg-gray-200 transition font-semibold"
                    >
                      Dashboard
                    </NavLink>

                    <NavLink
                      to="/update-profile"
                      className="px-4 py-3  hover:bg-gray-200 block  font-semibold"
                    >
                      Update Profile
                    </NavLink>

                    <NavLink
                      onClick={handleUserLogOut}
                      className="px-4 block py-3  hover:bg-gray-200  font-semibold"
                    >
                      LogOut
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  isActive
                    ? "border-2 rounded-2xl border-gray-300 btn mr-2 "
                    : "mr-4 "
                }
              >
                Join Us
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
