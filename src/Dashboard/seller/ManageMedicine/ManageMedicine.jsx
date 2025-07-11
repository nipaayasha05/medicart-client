import React from "react";

import { useState } from "react";
import ManageMedicineForm from "./ManageMedicineForm";
import ManageMedicineTable from "./ManageMedicineTable";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageMedicine = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: addMedicine = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["addMedicine"],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/getMedicine?email=${user?.email}`);

      return data;
    },
  });

  return (
    <div>
      <div className="flex justify-between py-5">
        <h3 className="text-bold text-3xl ">Manage Medicine</h3>
        <button
          onClick={() => {
            setIsOpen(true);
            document.getElementById("my_modal_2").showModal();
          }}
          className="btn      my-2 border-3 rounded-2xl border-gray-300 "
        >
          Add Medicine
        </button>
      </div>

      <div>
        <ManageMedicineTable addMedicine={addMedicine} isLoading={isLoading} />
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box   overflow-auto">
          {isOpen && (
            <ManageMedicineForm
              isOpen={isOpen}
              refetch={refetch}
            ></ManageMedicineForm>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ManageMedicine;
