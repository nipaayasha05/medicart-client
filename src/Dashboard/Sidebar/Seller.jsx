import React from "react";
import { BsMegaphoneFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { MdMedication } from "react-icons/md";
import { NavLink } from "react-router";

const Seller = () => {
  return (
    <div>
      {" "}
      <li>
        <NavLink
          to="/dashboard/manage-medicine"
          className={({ isActive }) =>
            `text-md font-bold ${
              isActive ? "border-b-2 bg-sky-200 border-b-sky-200" : ""
            }`
          }
        >
          <MdMedication size={20} /> Manage Medicine
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/payment-history"
          className={({ isActive }) =>
            `text-md font-bold ${
              isActive ? "border-b-2 bg-sky-200 border-b-sky-200" : ""
            }`
          }
        >
          <FaHistory size={20} /> Payment History
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/ask-advertisement"
          className={({ isActive }) =>
            `text-md font-bold ${
              isActive ? "border-b-2 bg-sky-200 border-b-sky-200" : ""
            }`
          }
        >
          <BsMegaphoneFill size={20} /> Ask For Advertisement
        </NavLink>
      </li>
    </div>
  );
};

export default Seller;
