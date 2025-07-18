import React from "react";
import useRole from "../hooks/useRole";
import { Navigate, useLocation } from "react-router";

const AdminRoute = ({ children }) => {
  const { role, isLoading } = useRole();
  const location = useLocation();
  console.log(location);
  console.log("admin wdwsedw");
  console.log(role);

  if (isLoading) return <div>Loading...</div>;

  if (role === "Admin") return children;
  return <Navigate to="/" state={{ from: location }} />;
};

export default AdminRoute;
