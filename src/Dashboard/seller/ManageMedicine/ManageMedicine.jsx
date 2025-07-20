import React from "react";

import { useState } from "react";
import ManageMedicineForm from "./ManageMedicineForm";
import ManageMedicineTable from "./ManageMedicineTable";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Loader";
import { Helmet } from "react-helmet";

const ManageMedicine = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem("token");

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Low to High");

  const {
    data: addMedicine = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["addMedicine", user?.email, search, sortOrder],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/getMedicine?email=${user?.email}&search=${search}&sort=${sortOrder}`
      );

      return data;
    },
  });

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
        <h3 className="font-bold text-3xl text-sky-600">Manage Medicine</h3>
        <button
          onClick={() => {
            setIsOpen(true);
            document.getElementById("my_modal_2").showModal();
          }}
          className="btn bg-sky-600 text-white    my-2   "
        >
          Add Medicine
        </button>
      </div>

      <div>
        <ManageMedicineTable
          search={search}
          setSearch={setSearch}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          addMedicine={addMedicine}
          isLoading={isLoading}
        />
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
