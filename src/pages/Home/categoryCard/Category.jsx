import React from "react";
import { Link } from "react-router";

const Category = ({ category }) => {
  console.log(category);
  return (
    <Link to={`category/${category.itemName}`}>
      <div>
        <div className="card bg-base-100   shadow-sm">
          <figure>
            <img className="w-full h-[320px]" src={category.image} />
          </figure>
          <div className="card-body">
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
