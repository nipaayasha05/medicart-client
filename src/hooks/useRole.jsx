import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`/user?email=${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  console.log(users[0]?.role, isLoading);

  return [users[0]?.role, isLoading];
};

export default useRole;
