import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PaymentManagement = () => {
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Low to High");

  const [currentPage, setCurrentPage] = useState(0);
  const [lastClicked, setLastClicked] = useState("");

  const itemsPerPage = 10;

  const {
    data: allPayment = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allPayment", search, sortOrder, currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-history-all?search=${search}&sort=${sortOrder}&page=${currentPage}&size=${itemsPerPage}`
      );
      // console.log(res.data);
      return res.data;
    },
  });

  const { data: allPaymentCount = {} } = useQuery({
    queryKey: ["allPaymentCount", search],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/payment-history-all-count?search${search}`
      );
      // console.log(data.count);
      return data;
    },
  });

  const numberOfPages = allPaymentCount?.count
    ? Math.ceil(allPaymentCount?.count / itemsPerPage)
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

  const handleAction = async (payment) => {
    const newStatus = payment.status === "pending" ? "paid" : "pending";
    const res = await axiosSecure.patch(
      `/update-payment-status/${payment._id}`,
      { status: newStatus }
    );
    if (res.data.modifiedCount > 0) {
      refetch();
    }
    // console.log(res.data);
    // console.log(payment);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto pb-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>MediCart|Payment Management</title>
      </Helmet>{" "}
      <h3 className="font-bold text-3xl font-montserrat text-sky-600 mt-5 p-2">
        Payment Management
      </h3>
      {allPayment.length > 0 ? (
        <div>
          <div className="flex flex-col  sm:flex-row   items-center justify-start gap-2">
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
                <tr className="bg-sky-200 lg:text-xl md:text-sm text-gray-700 sm:text-xl  lg:h-24 h-16 border-gray-400  border  ">
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
                    className="lg:text-xl  hover:text-black  text-black  md:text-sm bg-gray-100 hover:bg-orange-100 border-gray-400 rounded-box border  "
                    all={all}
                    key={all._id}
                  >
                    <td></td>

                    <td>{index + 1}</td>
                    <td></td>
                    <td className=" ">{all.email}</td>
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
                        className={`btn border border-sky-500 ${
                          all.status === "paid"
                            ? "bg-gray-100 text-gray-500"
                            : "bg-sky-500 text-white"
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
      <div className="py-5 text-center space-x-3  ">
        {/* <p>{currentPage}</p> */}
        {currentPage > 0 && (
          <button
            onClick={handlePreviousPage}
            className={`btn ${
              lastClicked === "previous"
                ? "bg-gray-100 text-sky-500 border-2 border-sky-500"
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
                ? "bg-gray-100 text-sky-500 border-2 border-sky-500"
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

export default PaymentManagement;
