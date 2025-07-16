import React from "react";
import { NavLink } from "react-router";

const Seller = () => {
  return (
    <div>
      {" "}
      <li>
        <NavLink to="/dashboard/manage-medicine">Manage Medicine</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/payment-history">Payment History</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/ask-advertisement">
          Ask For Advertisement
        </NavLink>
      </li>
    </div>
  );
};

export default Seller;
