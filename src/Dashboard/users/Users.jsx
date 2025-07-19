import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";

const Users = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-history?email=${user?.email}`
      );
      console.log(res.data);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="  mx-auto mt-5 m-10">
      <p className="p-2 py-3 text-3xl font-bold text-sky-600">
        Payment History{" "}
      </p>
      <p className="ml-2 text-xl text-sky-500">
        <strong>User:</strong>
        {user?.email}
      </p>
      {users.length > 0 ? (
        <div>
          <div className="overflow-x-auto py-5">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-sky-200 text-gray-800 sm:text-xl sm:h-24 h-16 border-b border-gray-300 ">
                  <th></th>
                  <th>#</th>

                  <th></th>

                  <th>Item Name</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Total Price ($)</th>
                  <th className="text-center">Order Date</th>
                  <th className="text-center">Grand Total ($) </th>
                  <th className="text-center"> Transaction ID</th>
                  <th className="text-center">Payment Method</th>

                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {users.map((user, index) =>
                  Array.isArray(user.items)
                    ? user?.items.map((item, i) => (
                        <tr
                          className={`hover:bg-gray-300 cursor-pointer ${
                            i === user.items.length - 1
                              ? "border-b border-gray-400"
                              : ""
                          }    `}
                          item={item}
                          key={`${item.medicineId}-${user._id}`}
                        >
                          <td></td>
                          <td>{i === 0 ? index + 1 : ""}</td>
                          <td></td>
                          <td>{item.itemName}</td>
                          <td className="text-center">{item.quantity}</td>
                          <td className="text-center">
                            {item.totalPrice.toFixed(2)}
                          </td>
                          <td className="text-center">
                            {" "}
                            {i === 0
                              ? new Date(user.orderDate).toLocaleDateString()
                              : ""}
                          </td>
                          <td className="text-center">
                            {i === 0 ? user.grandTotal : ""}
                          </td>

                          <td className="text-center">
                            {i === 0 ? user.transaction : ""}
                          </td>
                          <td className="text-center">
                            {i === 0 ? user.paymentMethod : ""}
                          </td>
                          <td className="text-center">
                            {i === 0 ? user.status : ""}
                          </td>
                        </tr>
                      ))
                    : null
                )}
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

export default Users;
