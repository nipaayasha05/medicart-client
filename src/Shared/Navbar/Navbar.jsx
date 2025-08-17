import React, { useState } from "react";
import Logo from "../Logo/Logo";
import useAuth from "../../hooks/useAuth";
import { FiEdit } from "react-icons/fi";
import { Link, NavLink, useLocation } from "react-router";
import { FaShop } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { FaGlobe, FaThList } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi2";
import { MdCategory, MdDashboard } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { HiOutlineViewGrid } from "react-icons/hi";
import toast from "react-hot-toast";

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
            `text-md font-bold ${isActive ? "border-b-2 border-b-sky-300" : ""}`
          }
        >
          <IoHome size={20} /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `text-md font-bold ${isActive ? "border-b-2 border-b-sky-300" : ""}`
          }
        >
          <FaShop size={20} color="black" /> Shop
        </NavLink>
      </li>

      <li>
        <NavLink
          to="fererere"
          className={({ isActive }) =>
            `text-md font-bold ${isActive ? "border-b-2 border-b-sky-300" : ""}`
          }
        >
          <HiShoppingCart size={20} color="black" /> Cart
        </NavLink>
      </li>

      {user && (
        <>
          {" "}
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `text-md font-bold ${
                  isActive ? "border-b-2 border-b-sky-300" : ""
                }`
              }
            >
              <HiShoppingCart size={20} color="black" /> Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category"
              className={({ isActive }) =>
                `text-md font-bold ${
                  isActive ? "border-b-2 border-b-sky-300" : ""
                }`
              }
            >
              <HiOutlineViewGrid size={20} color="black" /> All Category
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  const handleUserLogOut = () => {
    handleLogOut();
    // toast.success("User logout successfully");
    return <Navigate to="/signin" state={pathname}></Navigate>;
  };
  return (
    <div className="navbar font-open-sans top-0 fixed bg-gray-100 shadow-sm h-20 border-b-2 border-gray-100 z-10 ">
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
          <ul className="menu menu-horizontal px-1 flex items-center">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="relative  z-10">
              <div onClick={() => setIsOpen(!isOpen)} className="">
                <img
                  src={user && user.photoURL}
                  className="rounded-full w-12 h-12"
                  alt=""
                />
                {isOpen && (
                  <div
                    className="absolute  px- -mx-24 my-1 bg-base-100 rounded-xl shadow-2xl overflow-hidden 
              text-sm "
                  >
                    <NavLink
                      to="/dashboard"
                      className="px-4 py-3  flex gap-2  hover:bg-gray-100 transition font-semibold "
                    >
                      <MdDashboard size={20} /> Dashboard
                    </NavLink>

                    <NavLink
                      to="/update-profile"
                      className="px-4 py-3  hover:bg-gray-100  flex gap-2  font-semibold"
                    >
                      <FiEdit size={20} />
                      Update Profile
                    </NavLink>

                    <NavLink
                      onClick={handleUserLogOut}
                      className="px-4  flex gap-2 py-3  hover:bg-gray-100     font-semibold"
                    >
                      <TbLogout size={20} /> LogOut
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <NavLink to="/signin" className="btn bg-sky-500 text-white">
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
