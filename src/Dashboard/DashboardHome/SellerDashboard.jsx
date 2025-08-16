import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import Loader from "../../components/Loader";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useAuth from "../../hooks/useAuth";

const SellerDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: sellerRevenue = [], isLoading } = useQuery({
    queryKey: ["sellerRevenue"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(
        `/seller-sales-revenue?email=${user.email}`
      );
      // console.log(res.data);
      return res.data;
    },
  });
  const { data: sellerWeeklyRevenue = [] } = useQuery({
    queryKey: ["sellerWeeklyRevenue"],
    // enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/seller-weekly-revenue?email=${user?.email}`
      );
      // console.log(data);
      return data;
    },
  });

  const revenuChart = [
    {
      name: "Paid",
      value: sellerRevenue.paidTotal,
    },
    {
      name: "Pending",
      value: sellerRevenue.pendingTotal,
    },
  ];

  const weeklyDate = sellerWeeklyRevenue.map((item) => ({
    date: item._id,
    total: item.dailyTotal,
  }));

  const COLORS = ["#0EA5E9", "#FDBA74"];

  if (isLoading) return <Loader />;

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
            className="bg-orange-100 p-8 h-[150px]  rounded-2xl flex-1 flex items-center shadow-md
          "
          >
            <p className="text-xl">
              <strong>Paid Total :</strong> {sellerRevenue.paidTotal}$
            </p>
          </div>
          <div
            className="bg-sky-100  p-8 h-[150px] rounded-2xl flex-1 flex items-center shadow-md
          "
          >
            <p className="text-xl">
              <strong>Pending Total : </strong>
              {sellerRevenue.pendingTotal}$
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-end sm:justify-center mt-5 sm:items-center items-center">
        <div className="w-[350px] h-[350px] m-5">
          <ResponsiveContainer width="100%" height="90%">
            <PieChart width={400} height={350}>
              <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={revenuChart}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {revenuChart.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-[350px] h-[350px] ">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={40} data={weeklyDate}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#0EA5E9" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
