import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-dots loading-xl"></span>;
  }
  if (!user || !user.email) {
    return (
      <Navigate to="/signin" state={{ from: location.pathname }}></Navigate>
    );
  }

  return children;
};

export default PrivateRoute;
