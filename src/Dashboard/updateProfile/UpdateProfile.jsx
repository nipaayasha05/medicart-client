import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import UpdateProfileForm from "./UpdateProfileForm";
import useRole from "../../hooks/useRole";

const UpdateProfile = () => {
  const { user, setUser, updateUser } = useAuth();
  const { role } = useRole();
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="mt-10 bg-gray-200 mb-10 mx-auto rounded-box shadow-md shadow-gray-500 w-[350px] m-3 py-5">
        <div className="relative">
          <img
            className="mx-auto w-[250px] h-[250px] border-2 border-sky-300 rounded-full p-2 "
            src={user?.photoURL}
            alt=""
          />

          <p className="absolute -mt-4 badge badge-success   left-1/2 -ml-8 font-semibold">
            {role}
          </p>
        </div>

        <p className="text-center mt-5 text-gray-700">
          <strong>Name : </strong>
          {user?.displayName}
        </p>

        <p className="text-center text-gray-700">
          <strong>Email :</strong> {user?.email}
        </p>

        <div className="text-center py-5">
          <button
            onClick={() => {
              setIsOpen(true);
              document.getElementById("my_modal_2").showModal();
            }}
            className="btn bg-sky-500 text-white"
          >
            Update
          </button>
        </div>
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box   overflow-auto">
          {isOpen && (
            <UpdateProfileForm
              isOpen={isOpen}
              setUser={setUser}
              updateUser={updateUser}
            ></UpdateProfileForm>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default UpdateProfile;
