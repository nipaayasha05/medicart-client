import React from "react";
import CheckoutForm from "./CheckoutForm";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router";

const Checkout = () => {
  //   const { user } = useAuth();
  //   const axiosSecure = useAxiosSecure();
  //   const { medicineId } = useParams();
  //   console.log(medicineId);

  //   const { data: checkoutInfo = [], isLoading } = useQuery({
  //     queryKey: ["checkout", medicineId],
  //     queryFn: async () => {
  //       const res = await axiosSecure.get(`/checkout/${medicineId}`);
  //       console.log(res.data);
  //       return res.data;
  //     },
  //   });

  return (
    <div>
      <CheckoutForm></CheckoutForm>
    </div>
  );
};

export default Checkout;
