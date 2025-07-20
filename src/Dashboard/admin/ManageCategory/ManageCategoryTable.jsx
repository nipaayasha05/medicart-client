import React, { useState } from "react";
import UpdateCategory from "./UpdateCategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Loader";

const ManageCategoryTable = ({ categories, isLoading, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (isLoading) {
    return <Loader />;
  }

  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/category-delete/${_id}`);
      // console.log(res.data);
      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Category has been deleted.",
          icon: "success",
        });
        refetch();

        setSelectedCategory(null);
      }
    }
  };

  return (
    <div className="mx-auto mt-5 m-10">
      {categories.length > 0 ? (
        <div className="overflow-x-auto py-5">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-sky-200 text-gray-800 sm:text-xl sm:h-24 h-16">
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>

                <th>Category Image</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {categories.map((category, index) => (
                <tr
                  className="lg:text-xl md:text-sm hover:bg-gray-100"
                  category={category}
                  index={index}
                  key={category._id}
                >
                  <th>{index + 1}</th>
                  <td>
                    <img
                      className="w-36 sm:h-24 h-14  rounded-xl"
                      src={category?.image}
                      alt=""
                    />
                  </td>
                  <th>{category?.itemName}</th>
                  <td>{category.description} </td>
                  <td>{new Date(category.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsOpen(true);
                        document.getElementById("my_modal_1").showModal();
                      }}
                      className="btn  bg-sky-500 text-white    my-2    "
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    {" "}
                    <button
                      onClick={() => {
                        handleDelete(category._id);
                      }}
                      className="btn bg-sky-500 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p>No Medicine Found</p>
        </div>
      )}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box   overflow-auto">
          {isOpen && (
            <UpdateCategory
              refetch={refetch}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              isOpen={isOpen}
            ></UpdateCategory>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ManageCategoryTable;
