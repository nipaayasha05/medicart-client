import React from "react";
import { NavLink } from "react-router";

const User = () => {
  return (
    <div>
      <li>
        <NavLink to="/dashboard/users">Users</NavLink>
      </li>
    </div>
  );
};

export default User;
