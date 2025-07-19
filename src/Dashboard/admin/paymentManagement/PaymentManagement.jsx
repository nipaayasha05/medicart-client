import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader";
import { Helmet } from "react-helmet";

const PaymentManagement = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allPayment = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allPayment"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history-all`);
      console.log(res.data);
      return res.data;
    },
  });

  const handleAction = async (payment) => {
    const newStatus = payment.status === "pending" ? "paid" : "pending";
    const res = await axiosSecure.patch(
      `/update-payment-status/${payment._id}`,
      { status: newStatus }
    );
    if (res.data.modifiedCount > 0) {
      refetch();
    }
    console.log(res.data);
    console.log(payment);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto pb-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Payment Management</title>
      </Helmet>{" "}
      <h3 className="font-bold text-3xl text-sky-600 mt-5 p-2">
        Payment Management
      </h3>
      {allPayment.length > 0 ? (
        <div>
          <div className="overflow-x-auto py-5">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-sky-200 text-gray-800 sm:text-xl sm:h-24 h-16  ">
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
                  <tr
                    className="hover:bg-gray-100 cursor-pointer lg:text-xl md:text-sm  "
                    all={all}
                    key={all._id}
                  >
                    <td></td>

                    <td>{index + 1}</td>
                    <td></td>
                    <td className="text-center">{all.email}</td>
                    <td className="text-center">{all?.items.length}</td>
                    <td className="text-center">{all.grandTotal}</td>
                    <td className="text-center">
                      {new Date(all.orderDate).toLocaleString()}
                    </td>
                    <td className="text-center">{all.status}</td>
                    <td className="text-center">{all.transaction}</td>
                    <td
                      onClick={() => {
                        handleAction(all);
                      }}
                      className="text-center"
                    >
                      <button
                        className={`btn ${
                          all.status === "paid" ? "bg-violet-500" : "bg-sky-500"
                        }`}
                      >
                        Accept
                      </button>
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
