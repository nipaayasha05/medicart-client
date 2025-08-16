import React from "react";
import { BsPersonCircle } from "react-icons/bs";

const ArticleCard = ({ art }) => {
  // console.log(art);
  return (
    <div className="card transform transition duration-300 hover:scale-105  m-5 font-open-sans  shadow-md">
      <figure className="relative">
        <img className="w-full h-[280px]" src={art.image} />
        <p className="absolute py-1 w-full font-bold text-sm sm:text-xl text-center bottom-0 -mb-0.5 bg-sky-100">
          {art.category}
        </p>
      </figure>

      <div className="card-body text-black text-sm  sm:text-xl bg-gray-50">
        <div className="sm:h-10/12">
          <div className="flex  items-center gap-10  ">
            <h2 className=" sm:text-xl sm:font-bold card-title">{art.title}</h2>
          </div>
          <div className="text-start">
            <p>
              {" "}
              <span className="font-semibold">Description</span> : {art.summary}
            </p>
          </div>
        </div>

        <div className="flex items-center   gap-2">
          <BsPersonCircle size={28} />
          <div>
            <p
              className="
            font-semibold"
            >
              {art.author}
            </p>
            <p>{art.date}</p>
          </div>
        </div>
        <div className=" card-actions   ">
          {art.tags.map((tag, index) => (
            <span
              key={index}
              className="font-semibold  badge bg-sky-100    mr-2 "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

//

export default ArticleCard;
