import React, { useState } from "react";

import AskForAdvertisementTable from "./AskForAdvertisementTable";
import AskForAdvertisementForm from "./AskForAdvertisementForm";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AskForAdvertisement = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: addAdvertisement = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["addAdvertisement"],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/getAdvertisement?email=${user?.email}`
      );
      console.log(data);
      return data;
    },
  });

  return (
    <div className="container mx-auto">
      <div className="flex justify-between py-5">
        <h3 className="font-bold text-3xl "> Ask For Advertisement</h3>
        <button
          onClick={() => {
            setIsOpen(true);
            document.getElementById("my_modal_2").showModal();
          }}
          className="btn      my-2 border-3 rounded-2xl border-gray-300 "
        >
          Add Advertisement
        </button>
      </div>

      <div>
        <AskForAdvertisementTable
          addAdvertisement={addAdvertisement}
          isLoading={isLoading}
        />
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box   overflow-auto">
          {isOpen && (
            <AskForAdvertisementForm
              isOpen={isOpen}
              refetch={refetch}
            ></AskForAdvertisementForm>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default AskForAdvertisement;
