import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Users = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Low to High");
  const [currentPage, setCurrentPage] = useState(0);
  const [lastClicked, setLastClicked] = useState("");

  const itemsPerPage = 10;

  const { data: users = [], isLoading } = useQuery({
    queryKey: [
      "cart",
      user?.email,
      search,
      sortOrder,
      currentPage,
      itemsPerPage,
    ],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-history?email=${user?.email}&search=${search}&sort=${sortOrder}&page=${currentPage}&size=${itemsPerPage}`
      );
      // console.log(res.data);
      return res.data;
    },
  });

  const { data: paymentHistory = {} } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/payment-history-count?email=${user?.email}`
      );
      console.log(data.count);
      return data;
    },
  });

  useEffect(() => {
    setCurrentPage(0);
  }, [search, sortOrder]);

  const numberOfPages = paymentHistory?.count
    ? Math.ceil(paymentHistory?.count / itemsPerPage)
    : 0;
  const pages = [...Array(numberOfPages).keys()];

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setLastClicked("previous");
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
      setLastClicked("next");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="  mx-auto mt-5 m-10">
      <Helmet>
        <meta charSet="utf-8" />
        <title>MediCart|Payment History</title>
      </Helmet>
      <p className="p-2 py-3 text-3xl font-bold text-sky-600">
        Payment History{" "}
      </p>
      <p className="ml-2 text-xl text-sky-500">
        <strong>User:</strong>
        {user?.email}
      </p>
      {users.length > 0 ? (
        <div>
          <div className="flex flex-col sm:flex-row   items-center justify-start">
            <button
              onClick={() =>
                setSortOrder(
                  sortOrder === "Low to High" ? "High to Low" : "Low to High"
                )
              }
              className="btn text-white bg-sky-500"
            >
              Sort by price(
              {sortOrder})
            </button>

            <label className="input m-1  ">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="text"
                onBlur={(e) => setSearch(e.target.value)}
                className="grow  "
                placeholder="Search"
              />
            </label>
          </div>

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
      <div className="py-5 text-center space-x-3  ">
        {/* <p>{currentPage}</p> */}
        {currentPage > 0 && (
          <button
            onClick={handlePreviousPage}
            className={`btn ${
              lastClicked === "previous"
                ? "bg-sky-300 text-blue-500 border-2 border-sky-200"
                : "bg-sky-500 text-white"
            }`}
          >
            <FaArrowLeft /> Previous
          </button>
        )}

        {currentPage < pages.length - 1 && (
          <button
            onClick={handleNextPage}
            className={`btn ${
              lastClicked === "next"
                ? "bg-sky-300 text-blue-500 border-2 border-sky-200"
                : "bg-sky-500 text-white"
            }`}
          >
            Next <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Users;
