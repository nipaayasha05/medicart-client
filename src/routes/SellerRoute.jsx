import React from "react";
import { Navigate, useLocation } from "react-router";
import useRole from "../hooks/useRole";

const SellerRoute = ({ children }) => {
  const { role, isLoading } = useRole();
  const location = useLocation();
  console.log(location);
  console.log("seller");

  if (isLoading) return <div>Loading...</div>;

  if (role === "Seller") return children;
  return <Navigate to="/" />;
};

export default SellerRoute;
