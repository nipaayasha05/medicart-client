import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allPayment = [] } = useQuery({
    queryKey: ["allPayment"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history-all`);
      console.log(res.data);
      return res.data;
    },
  });
  return (
    <div className="container mx-auto">
      {" "}
      {allPayment.length > 0 ? (
        <div>
          <div className="overflow-x-auto py-5">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-gray-200 text-gray-800 sm:text-xl sm:h-24 h-16 border-b border-gray-300 ">
                  <th></th>
                  <th>#</th>

                  <th></th>

                  <th>Buyer Email</th>
                  <th className="text-center">Total Items</th>
                  <th className="text-center">Grand Total ($)</th>
                  <th className="text-center">Order Date</th>
                  <th className="text-center">Status</th>
                  <th className="text-center"> Transaction ID</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {allPayment.map((all, index) => (
                  <tr all={all} key={all._id}>
                    <td></td>

                    <td>{index + 1}</td>
                    <td></td>
                    <td className="text-center">{all.email}</td>
                    <td className="text-center">{all?.items.length}</td>
                    <td className="text-center">{all.grandTotal}</td>
                    <td className="text-center">
                      {new Date(all.orderDate).toLocaleDateString()}
                    </td>
                    <td className="text-center">{all.status}</td>
                    <td className="text-center">{all.transaction}</td>
                    <td className="text-center">
                      <button className="btn">Accept</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <p>No Medicine Found</p>
        </div>
      )}{" "}
    </div>
  );
};

export default PaymentManagement;
