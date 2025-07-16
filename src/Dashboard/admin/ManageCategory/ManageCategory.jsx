import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ManageMedicineForm from "../../seller/ManageMedicine/ManageMedicineForm";
import ManageCategoryForm from "./manageCategoryForm";
import ManageCategoryTable from "./ManageCategoryTable";

const ManageCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: categories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["category"],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/manageCategory`);

      return data;
    },
  });
  return (
    <div>
      {" "}
      <div>
        <div className="flex justify-between py-5">
          <h3 className="text-bold text-3xl ">Manage Category</h3>
          <button
            onClick={() => {
              setIsOpen(true);
              document.getElementById("my_modal_2").showModal();
            }}
            className="btn      my-2 border-3 rounded-2xl border-gray-300 "
          >
            Add Category
          </button>
        </div>

        <div>
          <ManageCategoryTable
            categories={categories}
            isLOading={isLoading}
            refetch={refetch}
          />
        </div>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box   overflow-auto">
            {isOpen && (
              <ManageCategoryForm
                setIsOpen={setIsOpen}
                refetch={refetch}
              ></ManageCategoryForm>
            )}
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ManageCategory;
