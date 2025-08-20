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
              <tr className=" bg-sky-200 lg:text-xl md:text-sm text-gray-700 sm:text-xl  lg:h-24 h-20 border-gray-400  border">
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th> Image</th>

                <th> Title</th>
                <th className="hidden md:hidden lg:block">Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {addAdvertisement.map((advertisement, index) => (
                <tr
                  className="lg:text-xl  hover:text-black  text-black  md:text-sm bg-gray-100 hover:bg-orange-100 border-gray-400 rounded-box border  "
                  advertisement={advertisement}
                  index={index}
                  key={advertisement._id}
                >
                  <td>{index + 1}</td>

                  <td>
                    <img
                      className="w-48 sm:h-24 h-20  rounded-xl"
                      src={advertisement?.image}
                      alt=""
                    />
                  </td>

                  <td>{advertisement?.medicineName}</td>

                  <td className="hidden md:hidden lg:block">
                    {advertisement.description}
                  </td>
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
