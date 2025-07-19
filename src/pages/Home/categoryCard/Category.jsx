import React from "react";
import { Link } from "react-router";

const Category = ({ category }) => {
  // console.log(category);
  return (
    <Link to={`category/${category.itemName}`}>
      <div>
        <div className="card border-2 border-gray-200  hover:shadow-2xl   shadow-md  ">
          <figure>
            <img className="w-full h-[320px]" src={category.image} />
          </figure>
          <div className=" card-body bg-gradient-to-r from-sky-200    to-gray-100 text-gray-800">
            <h2 className="card-title">{category.itemName}</h2>
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
