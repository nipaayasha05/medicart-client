import React from "react";
import { FaHistory } from "react-icons/fa";
import { NavLink } from "react-router";

const User = () => {
  return (
    <div>
      <li>
        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            `text-md font-bold ${
              isActive ? "border-b-2 bg-sky-200 border-b-sky-200" : ""
            }`
          }
        >
          <FaHistory size={20} />
          Payment History
        </NavLink>
      </li>
    </div>
  );
};

export default User;
