import React from "react";
import { Link } from "react-router";

const Category = ({ category }) => {
  // console.log(category);
  return (
    <Link to={`category/${category.itemName}`}>
      <div>
        <div className="card     transform transition duration-300 hover:scale-105   shadow-md  ">
          <figure>
            <img className="w-full h-[320px]" src={category.image} />
          </figure>
          <div className="font-open-sans card-body bg-gradient-to-r from-sky-10    to-orange-5 bg-gray-100 text-gray-800">
            <p className="card-title">
              <strong>Category Name : </strong>
              {category.itemName}
            </p>
            <h2 className="card-title">
              Number of Medicine :{category.medicineCount}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Category;
