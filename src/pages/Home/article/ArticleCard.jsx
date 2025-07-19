import React from "react";
import { BsPersonCircle } from "react-icons/bs";

const ArticleCard = ({ art }) => {
  console.log(art);
  return (
    <div>
      {" "}
      <div className="card border-2 card-md flex flex-col border-gray-200   bg-gray-100  m-5 shadow-sm">
        <figure className=" ">
          <img
            src={art.image}
            alt="Shoes"
            className="rounded-xl p-2 w-full h-[250px]"
          />
        </figure>
        <div className="card-body text-gray-700">
          <div className=" space-y-2">
            <p className="  text-center  -mt-6 bg-green-200 p-2 rounded-full font-bold ">
              {art.category}
            </p>
            <h2 className="card-title sm:text-xl">{art.title}</h2>

            <p className="sm:text-xl">{art.summary}</p>
            <div className="flex items-center gap-2">
              <BsPersonCircle size={28} />
              <div>
                <p>{art.author}</p>
                <p>{art.date}</p>
              </div>
            </div>

            <div className="  justify-start ">
              {art.tags.map((tag, index) => (
                <span
                  key={index}
                  className=" text-white badge bg-emerald-500    mr-2 "
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//

export default ArticleCard;
