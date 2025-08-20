import React, { useEffect, useState } from "react";
import Logo from "../Logo/Logo";
import useAuth from "../../hooks/useAuth";
import { FiEdit } from "react-icons/fi";
import { Link, NavLink, useLocation } from "react-router";
import { FaShop } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { FaGlobe, FaInfoCircle, FaThList } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi2";
import { MdCategory, MdDashboard } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { HiOutlineViewGrid } from "react-icons/hi";
import toast from "react-hot-toast";

const Navbar = () => {
  // theme
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

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
          <IoHome size={20} color="black" /> Home
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
          to="/about"
          className={({ isActive }) =>
            `text-md font-bold ${isActive ? "border-b-2 border-b-sky-300" : ""}`
          }
        >
          <FaInfoCircle size={20} color="black" /> About Us
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
    <div className="navbar text-black font-open-sans top-0 fixed bg-sky-50 shadow-sm h-20 border-b-2 border-sky-100 z-10 ">
      <div className="flex  container mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle bg-gray-100 text-black border-none lg:hidden"
            >
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
              className="menu menu-sm dropdown-content bg-gray-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
          {/* dark mode */}
          <label className="swap swap-rotate px-1">
            {/* this hidden checkbox controls the state */}
            <input
              onChange={handleToggle}
              checked={theme === "light" ? false : true}
              type="checkbox"
              className="theme-controller"
              value="autumn"
            />

            {/* sun icon */}
            <svg
              className="swap-off h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on h-6 w-6 text-black fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

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
                    className="absolute bg-gray-100  px- -mx-24 my-1 bg-base-100 rounded-xl shadow-2xl overflow-hidden 
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
                      className="px-4  flex gap-2 py-3  hover:bg-gray-100   border-none  font-semibold"
                    >
                      <TbLogout size={20} /> LogOut
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <NavLink
                to="/signin"
                className="btn border-none bg-sky-500 text-white"
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
