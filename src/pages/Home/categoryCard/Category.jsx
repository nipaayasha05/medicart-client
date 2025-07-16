import React from "react";

const Category = ({ category }) => {
  console.log(category);
  return (
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
  );
};

export default Category;
