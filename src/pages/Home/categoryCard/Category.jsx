import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const Category = ({ category }) => {
  // console.log(category);
  return (
    <div className="card bg-gray-50 font-open-sans transform transition duration-300 hover:scale-105  shadow-md">
      <figure>
        <img className="w-full h-[280px]" src={category.image} />
      </figure>
      <div className="">
        <div className="card-body text-black text-sm  sm:text-xl  ">
          <div className="sm:h-10/12">
            <div className="  ">
              <h2 className="text-sm sm:text-xl card-title -ml-2 ">
                <strong></strong> {category.itemName}
              </h2>
              <p className="text-sm sm:text-xl card-md">
                <strong>Total Medicine : </strong>
                {category.medicineCount}
              </p>
              <p className="text-sm sm:text-xl  line-clamp-4 ">
                {category.description}
              </p>
            </div>
          </div>
          <div className="card-actions justify-end ">
            <Link to={`category/${category.itemName}`}>
              <button className="btn  border-none  bg-sky-500 text-white   ">
                View Medicines <FaArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
