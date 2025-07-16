import React from "react";
import { NavLink } from "react-router";

const Admin = () => {
  return (
    <div>
      {" "}
      <li>
        <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/payment-management">Payment Management</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-banner-advertise">
          Manage Banner Advertise
        </NavLink>
      </li>
    </div>
  );
};

export default Admin;
