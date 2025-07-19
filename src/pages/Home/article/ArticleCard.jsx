import React from "react";
import { BsPersonCircle } from "react-icons/bs";

const ArticleCard = ({ art }) => {
  console.log(art);
  return (
    <div>
      {" "}
      <div className="card   bg-base-200  m-5 shadow-sm">
        <figure className="px-8 pt-8">
          <img src={art.image} alt="Shoes" className="rounded-xl h-[240px]" />
        </figure>
        <div className="card-body flex-grow flex flex-col h-   ">
          <div className="flex gap-5    ">
            <h2 className="card-title  sm:text-xl font-bold text-gray-800    ">
              {art.title}
            </h2>
            <p className="badge bg-green-100 text-green-800 font-semibold px-3 py-6  mr-3">
              {art.category}
            </p>
          </div>
          <p className="  sm:text-xl text-gray-700">{art.summary}</p>
          <div className="flex   flew-wrap gap-2">
            <BsPersonCircle size={28} />
            <div className="text-gray-600">
              <p>{art.author}</p>
              <p>{art.date}</p>
            </div>
          </div>
          <p>
            {art.tags.map((tag, index) => (
              <span
                key={index}
                className=" text-white badge bg-emerald-500   flex-col mr-3 "
              >
                {tag}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
