import React from "react";

const ServiceCard = ({ service }) => {
  return (
    <div className="card font-open-sans transform transition duration-300 hover:scale-105 border-l-5 border-t-5 border-t-gray-100  rounded-xl border-l-gray-100  bg-orange-50  m-5 shadow-md">
      <div className=" m-1 ">
        <figure className="px-2 pt-2 ">
          <img
            src={service.icon}
            className="w-full h-[150px] rounded-xl p-2 bg-gray-100"
          />
        </figure>
        <div className="card-body h-1/12 items-center text-center sm:text-lg">
          <h2 className="card-title text-gray-700 font-bold">
            {service.title}
          </h2>
          <p className="text-gray-700">{service.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
