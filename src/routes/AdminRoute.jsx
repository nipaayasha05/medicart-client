import React from "react";
import useRole from "../hooks/useRole";
import { Navigate, useLocation } from "react-router";
import Loader from "../components/Loader";

const AdminRoute = ({ children }) => {
  const { role, isLoading } = useRole();
  const location = useLocation();
  console.log(location);
  console.log("admin wdwsedw");
  console.log(role);

  if (isLoading) return <Loader />;

  if (role === "Admin") return children;
  return <Navigate to="/" state={{ from: location }} />;
};

export default AdminRoute;
