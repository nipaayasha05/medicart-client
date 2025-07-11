import React from "react";

const AskForAdvertisementTable = ({ addAdvertisement, isLoading }) => {
  if (isLoading) {
    return (
      <div>
        <span className="loading loading-dots loading-xl"></span>;
      </div>
    );
  }
  return (
    <div>
      {" "}
      {addAdvertisement.length > 0 ? (
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
                      className="w-36 sm:h-24 h-14  rounded-xl"
                      src={advertisement?.image}
                      alt=""
                    />
                  </td>

                  <th>{advertisement?.medicineName}</th>

                  <td>{advertisement.description}</td>
                  <td>{advertisement.status}</td>
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
