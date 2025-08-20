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
      // console.log(res.data);
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
        <title>MediCart|Manage Users</title>
      </Helmet>
      <h3 className="font-bold font-montserrat text-3xl p-2 mt-5 text-sky-500">
        Manage Users
      </h3>{" "}
      <div className="overflow-x-auto py-5  ">
        <table className="table ">
          {/* head */}
          <thead className="rounded-xl ">
            <tr className="bg-sky-200 lg:text-xl md:text-sm text-gray-700 sm:text-xl  lg:h-24 h-16 border-gray-400  border">
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
                className="lg:text-xl  hover:text-black  text-black  md:text-sm bg-gray-100 hover:bg-orange-100 border-gray-400 rounded-box border  "
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
                    className="btn border-none bg-sky-500 text-white"
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
