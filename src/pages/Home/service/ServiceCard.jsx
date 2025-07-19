import React from "react";

const ServiceCard = ({ service }) => {
  return (
    <div className="card sm:card-xs bg-gradient-to-r from-sky-200    to-gray-200   m-5 shadow-sm">
      <div className=" m-1 border-l-5 border-t-5 border-t-gray-200  rounded-xl border-l-indigo-100">
        <figure className="px-10 pt-10 ">
          <img
            src={service.icon}
            className="w-[150px] h-[120px] rounded-xl p-2 bg-gray-200"
          />
        </figure>
        <div className="card-body h-1/12 items-center text-center">
          <h2 className="card-title sm:text-xl font-bold">{service.title}</h2>
          <p className="sm:text-xl text-gray-700">{service.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
