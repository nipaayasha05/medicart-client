import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const SellerDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: revenue = [], isLoading } = useQuery({
    queryKey: ["revenue"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(
        `/seller-sales-revenue?email=${user.email}`
      );
      // console.log(res.data);
      return res.data;
    },
  });
  return (
    <div className="container mx-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>MediCart|Seller Dashboard</title>
      </Helmet>
      <p className="text-3xl font-bold  text-center text-sky-600 pt-5">
        Total Revenue
      </p>
      <div className="flex justify-center">
        <div className="mt-10 shadow-md p-10 rounded-xl  w-10/12 flex justify-center items-center bg-gray-100 gap-5 ">
          {" "}
          <div
            className="bg-violet-200 p-8 h-[150px]  rounded-2xl flex-1 flex items-center
          "
          >
            <p className="text-xl">
              <strong>Paid Total :</strong> {revenue.paidTotal}$
            </p>
          </div>
          <div
            className="bg-cyan-200  p-8 h-[150px] rounded-2xl flex-1 flex items-center
          "
          >
            <p className="text-xl">
              <strong>Pending Total : </strong>
              {revenue.pendingTotal}$
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
