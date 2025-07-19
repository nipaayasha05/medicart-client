import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader";
import { Helmet } from "react-helmet";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: paymentHistory = [], isLoading } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/seller-payment-history?email=${user?.email}`
      );
      console.log(res.data);

      return res.data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Payment History</title>
      </Helmet>
      <h3 className="font-bold p-2 text-3xl text-sky-600 pt-5">
        Payment History
      </h3>
      {paymentHistory.length > 0 ? (
        <div>
          <div className="overflow-x-auto py-5 mb-5 ">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-sky-200 text-gray-800 sm:text-xl sm:h-24 h-16">
                  <th></th>
                  <th>#</th>

                  <th>Buyer Email</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Order Date</th>
                  <th>Transaction ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {paymentHistory.map((history, index) => (
                  <tr
                    className="lg:text-xl md:text-sm hover:bg-gray-100"
                    history={history}
                    index={index}
                    key={`${history._id}${index}`}
                  >
                    <td></td>
                    <td>{index + 1}</td>
                    <td>{history.buyerEmail}</td>
                    <td>{history.item}</td>
                    <td>{history.quantity}</td>
                    <td>{history.totalPrice.toFixed(2)}</td>
                    <td>{new Date(history.orderDate).toLocaleString()}</td>
                    <td>{history.transaction}</td>
                    <td>{history.status}</td>
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

export default PaymentHistory;
