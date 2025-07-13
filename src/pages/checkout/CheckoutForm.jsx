import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const CheckoutForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  console.log(id);

  const { data: checkoutInfo, isLoading } = useQuery({
    queryKey: ["checkout", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/checkout/${id}`);
      console.log(res.data);
      return res.data;
    },
  });

  return <div></div>;
};

export default CheckoutForm;
