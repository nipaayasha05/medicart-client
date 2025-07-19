import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

import ManageUserModal from "./ManageUserModal";
import Loader from "../../../components/Loader";
import { Helmet } from "react-helmet";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure("/all-users");
      console.log(res.data);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="pb-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Manage Users</title>
      </Helmet>
      <h3 className="font-bold text-3xl p-2 mt-5 text-sky-600">Manage Users</h3>{" "}
      <div className="overflow-x-auto py-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-sky-200 text-gray-800 sm:text-xl sm:h-24 h-16">
              <th></th>
              <th>#</th>

              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr
                className="lg:text-xl md:text-sm hover:bg-gray-100"
                user={user}
                index={index}
                key={user._id}
              >
                <td></td>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setIsOpen(true);
                      document.getElementById("my_modal_2").showModal();
                    }}
                    className="btn bg-sky-500 text-white"
                  >
                    Update Role
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box   overflow-auto">
          {isOpen && (
            <ManageUserModal
              isOpen={isOpen}
              selectedUser={selectedUser}
              refetch={refetch}
            ></ManageUserModal>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ManageUsers;
