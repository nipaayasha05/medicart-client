import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: `https://assignment-12-server-nine-hazel.vercel.app`,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, handleLogOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        console.log("error", err.response);
        if (err.response.status === 401 || err.response.status === 403) {
          handleLogOut();
          navigate("/signin");
        }
        return Promise.reject(err);
      }
    );
  }, [handleLogOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
