import React from "react";

import { useState } from "react";
import ManageMedicineForm from "./ManageMedicineForm";

const ManageMedicine = () => {
  let [isOpen, setIsOpen] = useState(false);

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
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box   overflow-auto">
          {isOpen && <ManageMedicineForm isOpen={isOpen}></ManageMedicineForm>}
        </div>
      </dialog>
    </div>
  );
};

export default ManageMedicine;
