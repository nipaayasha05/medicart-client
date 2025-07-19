import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { data: totalRevenue = [], isLoading } = useQuery({
    queryKey: ["totalRevenue"],
    // enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure("/admin-sales-revenue");
      console.log(data);
      return data;
    },
  });
  return (
    <div className="container mx-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin Dashboard</title>
      </Helmet>
      <div className="flex justify-center">
        <div className="mt-10 shadow-md p-10 rounded-xl  w-10/12 flex justify-center items-center bg-gray-100 gap-5 ">
          {" "}
          <div
            className="bg-violet-200 p-8 h-[150px]  rounded-2xl flex-1 flex items-center
          "
          >
            <p className="text-xl">
              <strong>Paid Total :</strong> {totalRevenue.paidTotal}
            </p>
          </div>
          <div
            className="bg-cyan-200  p-8 h-[150px] rounded-2xl flex-1 flex items-center
          "
          >
            <p className="text-xl">
              <strong>Pending Total : </strong>
              {totalRevenue.pendingTotal}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
