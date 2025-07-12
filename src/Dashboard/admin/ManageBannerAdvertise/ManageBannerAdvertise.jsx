import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageBannerAdvertise = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: adminAdvertise = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["addMedicine"],
    // enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure("/getAdminAdvertise");
      console.log(data);
      return data;
    },
  });
  if (isLoading) {
    return (
      <div>
        <span className="loading loading-dots loading-xl"></span>;
      </div>
    );
  }

  const handleToggleSlide = async (advertise) => {
    const newStatus =
      advertise.status === "Add to slide"
        ? "Remove from slide"
        : "Add to slide";
    const res = await axiosSecure.patch(`/advertise-status/${advertise._id}`, {
      status: newStatus,
    });
    if (res.data.modifiedCount > 0) {
      refetch();
    }
    console.log(res.data);
  };

  return (
    <div>
      <div className="overflow-x-auto py-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr className=" bg-gray-200  text-gray-800 sm:text-xl sm:h-24 h-16 ">
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Medicine Image</th>

              <th>Medicine Name</th>
              <th>Description</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {adminAdvertise.map((advertise, index) => (
              <tr
                className="lg:text-xl md:text-sm hover:bg-gray-100"
                advertise={advertise}
                index={index}
                key={advertise._id}
              >
                <th>{index + 1}</th>

                <td>
                  <img
                    className="w-36 sm:h-24 h-14  rounded-xl"
                    src={advertise?.image}
                    alt=""
                  />
                </td>

                <th>{advertise?.medicineName}</th>

                <td>{advertise.description}</td>
                <td>{advertise.email}</td>
                <td>
                  {" "}
                  <button
                    onClick={() => {
                      handleToggleSlide(advertise);
                    }}
                    className={`btn w-[150px] py-4 p-1 lg:py-6   ${
                      advertise.status === "Add to slide"
                        ? "btn-success"
                        : "btn-error"
                    }`}
                  >
                    {advertise.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBannerAdvertise;
