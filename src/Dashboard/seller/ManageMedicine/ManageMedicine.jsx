import React, { useEffect } from "react";

import { useState } from "react";
import ManageMedicineForm from "./ManageMedicineForm";
import ManageMedicineTable from "./ManageMedicineTable";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Loader";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ManageMedicine = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem("token");

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Low to High");

  const [currentPage, setCurrentPage] = useState(0);
  const [lastClicked, setLastClicked] = useState("");

  const itemsPerPage = 10;

  const {
    data: addMedicine = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "addMedicine",
      user?.email,
      search,
      sortOrder,
      currentPage,
      itemsPerPage,
    ],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/getMedicine?email=${user?.email}&search=${search}&sort=${sortOrder}&page=${currentPage}&size=${itemsPerPage}`
      );

      return data;
    },
  });

  const { data: getMedicineCount = {} } = useQuery({
    queryKey: ["getMedicineCount"],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/getMedicine-count?email=${user?.email}`
      );
      console.log(data.count);
      return data;
    },
  });

  useEffect(() => {
    setCurrentPage(0);
  }, [search, sortOrder]);

  const numberOfPages = getMedicineCount?.count
    ? Math.ceil(getMedicineCount?.count / itemsPerPage)
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

  const {
    data: categories = [],
    // isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["category"],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/manageCategorySeller`);
      // console.log(data);
      return data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex p-2 justify-between items-center py-5">
        <Helmet>
          <meta charSet="utf-8" />
          <title>MediCart|Manage Medicines</title>
        </Helmet>
        <h3 className="font-bold text-3xl text-sky-600 font-montserrat">
          Manage Medicine
        </h3>
        <button
          onClick={() => {
            setIsOpen(true);
            document.getElementById("my_modal_2").showModal();
          }}
          className="btn font-open-sans bg-sky-600 text-white    my-2   "
        >
          Add Medicine
        </button>
      </div>

      <div className="font-open-sans">
        <ManageMedicineTable
          search={search}
          setSearch={setSearch}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          addMedicine={addMedicine}
          isLoading={isLoading}
        />
      </div>
      <div className="py-5 text-center space-x-3  font-open-sans">
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
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box   overflow-auto">
          {isOpen && (
            <ManageMedicineForm
              isOpen={isOpen}
              refetch={refetch}
              categories={categories}
            ></ManageMedicineForm>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ManageMedicine;
