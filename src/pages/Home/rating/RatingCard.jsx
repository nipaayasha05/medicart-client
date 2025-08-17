import React from "react";
import { FaStar } from "react-icons/fa6";

const RatingCard = ({ rating }) => {
  return (
    <div className="card  font-open-sans transform transition duration-300 hover:scale-105 border-l-5     rounded-xl border-l-sky-100  bg-orange-50  m-5 shadow-md">
      <div className=" m-1 ">
        <figure className="px-10 pt-1 ">
          <img
            src={rating.photo}
            className="w-[150px] h-[150px] rounded-full p-1    bg-gray-100"
          />
        </figure>
        <div className="card-body text-black  h-1/12 items-center text-center  ">
          <div className="flex items-center gap-1 text-orange-400">
            {Array.from({ length: rating.rating }).map((_, i) => (
              <FaStar key={i} size={18} />
            ))}
          </div>
          <h2 className="card-title sm:text-xl font-bold">{rating.name}</h2>
          <p className="sm:text-xl text-gray-700">{rating.review}</p>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
