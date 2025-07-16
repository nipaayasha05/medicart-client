import React from "react";
import useRole from "../../hooks/useRole";
import AdminDashboard from "./AdminDashboard";
import SellerDashboard from "./SellerDashboard";
import Users from "../users/Users";

const DashboardHome = () => {
  const [role, isLoading] = useRole();
  if (isLoading) return <p>Loading....</p>;

  if (role === "Admin") {
    return <AdminDashboard />;
  }
  if (role === "Seller") {
    return <SellerDashboard />;
  }

  if (role === "User") {
    return <Users />;
  }
};

export default DashboardHome;
