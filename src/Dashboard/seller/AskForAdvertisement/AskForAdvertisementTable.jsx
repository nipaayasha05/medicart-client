import React from "react";
import Loader from "../../../components/Loader";

const AskForAdvertisementTable = ({ addAdvertisement, isLoading }) => {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      {addAdvertisement.length > 0 ? (
        <div className="overflow-x-auto py-5 mb-5">
          <table className="table">
            {/* head */}
            <thead>
              <tr className=" bg-sky-200  text-gray-800 sm:text-xl sm:h-24 h-16 ">
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th> Image</th>

                <th> Title</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {addAdvertisement.map((advertisement, index) => (
                <tr
                  className="lg:text-xl md:text-sm hover:bg-gray-100"
                  advertisement={advertisement}
                  index={index}
                  key={advertisement._id}
                >
                  <th>{index + 1}</th>

                  <td>
                    <img
                      className="w-40 sm:h-24 h-14  rounded-xl"
                      src={advertisement?.image}
                      alt=""
                    />
                  </td>

                  <th>{advertisement?.medicineName}</th>

                  <td>{advertisement.description}</td>
                  <td
                    className={`font-bold ${
                      advertisement.status === "Add to slide"
                        ? "text-red-500"
                        : advertisement.status === "Remove from slide"
                        ? "text-green-500"
                        : "text-green-500"
                    }`}
                  >
                    {advertisement.status === "Add to slide"
                      ? "Not use"
                      : advertisement.status === "Remove from slide"
                      ? "Use in slider"
                      : advertisement.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p>
            No advertisements added! Click the button to submit your first
            advertise.
          </p>
        </div>
      )}
    </div>
  );
};

export default AskForAdvertisementTable;
