import React from "react";
import logo from "../../assets/shop.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link to="/">
        <div
          className="flex items-center  gap-2  
    "
        >
          <img className="mb-2 w-14 h-12" src={logo} alt="" />
          <p className="text-3xl text-sky-500 -ml-2 font-extrabold font-montserrat">
            MediCart
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
