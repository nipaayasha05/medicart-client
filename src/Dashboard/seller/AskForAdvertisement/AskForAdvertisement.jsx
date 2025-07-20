import React, { useState } from "react";

import AskForAdvertisementTable from "./AskForAdvertisementTable";
import AskForAdvertisementForm from "./AskForAdvertisementForm";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Loader";
import { Helmet } from "react-helmet";

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
      // console.log(data);
      return data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>MediCart|Ask for Advertise</title>
      </Helmet>
      <div className="flex p-2 justify-between items-center py-5">
        <h3 className="font-bold text-3xl text-sky-600">
          {" "}
          Ask For Advertisement
        </h3>
        <button
          onClick={() => {
            setIsOpen(true);
            document.getElementById("my_modal_2").showModal();
          }}
          className="btn  bg-sky-600 text-white    my-2   "
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
