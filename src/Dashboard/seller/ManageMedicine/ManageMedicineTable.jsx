import React from "react";

const ManageMedicineTable = ({ addMedicine, isLoading }) => {
  if (isLoading) {
    return (
      <div>
        <span className="loading loading-dots loading-xl"></span>;
      </div>
    );
  }
  return (
    <div>
      {addMedicine.length > 0 ? (
        <div className="overflow-x-auto py-5">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-gray-200 text-gray-800 sm:text-xl sm:h-24 h-16">
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>

                <th>Medicine Image</th>
                <th>Item Name</th>
                <th>Generic Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Company</th>
                <th>Mass Unit</th>
                <th>Price</th>
                <th>Discount</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {addMedicine.map((medicine, index) => (
                <tr
                  className="lg:text-xl md:text-sm hover:bg-gray-100"
                  medicine={medicine}
                  index={index}
                  key={medicine._id}
                >
                  <th>{index + 1}</th>
                  <td>
                    <img
                      className="w-36 sm:h-24 h-14  rounded-xl"
                      src={medicine?.image}
                      alt=""
                    />
                  </td>
                  <th>{medicine?.itemName}</th>
                  <td>{medicine.genericName} $</td>
                  <td>{medicine.description}</td>
                  <td>{medicine.category}</td>
                  <td>{medicine.company}</td>
                  <td>{medicine.massUnit}</td>
                  <td>{medicine.price}$</td>
                  <td>{medicine.discount}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p>No Medicine Found</p>
        </div>
      )}
    </div>
  );
};

export default ManageMedicineTable;
