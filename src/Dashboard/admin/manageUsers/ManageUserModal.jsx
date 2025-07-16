import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUserModal = ({ selectedUser, refetch, isOpen }) => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const res = await axiosSecure.patch(
      `/update-user-role/${selectedUser._id}`,
      { role: data.role }
    );
    console.log(res.data);

    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Role Updated!",
        text: "User role updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select
          name="role"
          {...register("role", { required: true })}
          className="select select-bordered w-full"
          defaultValue={selectedUser?.role}
        >
          {" "}
          <option value="Admin">Admin</option>
          <option value="Seller">Seller</option>
          <option value="User">User</option>
        </select>
        <div className="flex justify-end pt-3">
          <button
            type="submit"
            onClick={() => {
              document.getElementById("my_modal_2").close();
            }}
            className="btn btn-primary mr-2  "
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              document.getElementById("my_modal_2").close();
            }}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageUserModal;
