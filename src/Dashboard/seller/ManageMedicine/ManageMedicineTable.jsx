import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";

const ManageMedicineTable = ({
  search,
  sortOrder,
  setSortOrder,
  setSearch,
  addMedicine,
  isLoading,
}) => {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="mx-auto mt-5 m-10">
      {addMedicine.length > 0 ? (
        <div>
          <button
            onClick={() =>
              setSortOrder(
                sortOrder === "Low to High" ? "High to Low" : "Low to High"
              )
            }
            className="btn text-white bg-sky-500"
          >
            Sort by price(
            {sortOrder})
          </button>

          <label className="input m-1">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="text"
              onBlur={(e) => setSearch(e.target.value)}
              className="grow"
              placeholder="Search"
            />
          </label>

          <div className="overflow-x-auto py-5">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-sky-200 lg:text-xl md:text-sm text-gray-700 sm:text-xl  lg:h-24 h-20 border-gray-400  border">
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
                    className="lg:text-xl  hover:text-black  text-black  md:text-sm bg-gray-100 hover:bg-orange-100 border-gray-400 rounded-box border  "
                    medicine={medicine}
                    index={index}
                    key={medicine._id}
                  >
                    <th>{index + 1}</th>
                    <td>
                      <img
                        className="w-36 sm:h-24 h-20  rounded-xl"
                        src={medicine?.image}
                        alt=""
                      />
                    </td>
                    <th>{medicine?.itemName}</th>
                    <td>{medicine.genericName} </td>
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
