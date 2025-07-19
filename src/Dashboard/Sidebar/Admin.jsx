import React from "react";
import { AiFillCreditCard } from "react-icons/ai";
import { BsImageFill } from "react-icons/bs";
import { FaUsersCog } from "react-icons/fa";
import { FiBarChart2 } from "react-icons/fi";
import { MdCategory } from "react-icons/md";
import { NavLink } from "react-router";

const Admin = () => {
  return (
    <div>
      {" "}
      <li>
        <NavLink
          to="/dashboard/manage-users"
          className={({ isActive }) =>
            `text-md font-bold ${
              isActive ? "border-b-2 bg-sky-200 border-b-sky-200" : ""
            }`
          }
        >
          {" "}
          <FaUsersCog size={20} />
          Manage Users
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manage-category"
          className={({ isActive }) =>
            `text-md font-bold ${
              isActive ? "border-b-2 bg-sky-200 border-b-sky-200" : ""
            }`
          }
        >
          {" "}
          <MdCategory size={20} />
          Manage Category
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/payment-management"
          className={({ isActive }) =>
            `text-md font-bold ${
              isActive ? "border-b-2 bg-sky-200 border-b-sky-200" : ""
            }`
          }
        >
          {" "}
          <AiFillCreditCard size={20} />
          Payment Management
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/sales-report"
          className={({ isActive }) =>
            `text-md font-bold ${
              isActive ? "border-b-2 bg-sky-200 border-b-sky-200" : ""
            }`
          }
        >
          {" "}
          <FiBarChart2 size={20} />
          Sales Report
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manage-banner-advertise"
          className={({ isActive }) =>
            `text-md font-bold ${
              isActive ? "border-b-2 bg-sky-200 border-b-sky-200" : ""
            }`
          }
        >
          <BsImageFill size={20} /> Manage Banner Advertise
        </NavLink>
      </li>
    </div>
  );
};

export default Admin;
