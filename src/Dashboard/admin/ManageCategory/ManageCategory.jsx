import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ManageMedicineForm from "../../seller/ManageMedicine/ManageMedicineForm";
import ManageCategoryForm from "./manageCategoryForm";
import ManageCategoryTable from "./ManageCategoryTable";
import Loader from "../../../components/Loader";
import { Helmet } from "react-helmet";

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
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MediCart|Manage Category</title>
      </Helmet>{" "}
      <div>
        <div className="flex justify-between p-2 items-center ">
          <h3 className="font-bold text-3xl font-montserrat text-sky-600">
            Manage Category
          </h3>
          <button
            onClick={() => {
              setIsOpen(true);
              document.getElementById("my_modal_2").showModal();
            }}
            className="btn  bg-sky-500 text-white  font-open-sans  my-2  "
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
