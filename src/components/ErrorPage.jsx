import React from "react";
import { Link } from "react-router";
import error from "../assets/medicine404.png";
import { Helmet } from "react-helmet";

const ErrorPage = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>404</title>
      </Helmet>
      <div className="flex m-5   py-20 flex-col justify-center items-center">
        <img className="h-[50vh]  rounded-2xl " src={error} alt="" />
        <div className="py-5">
          <Link to="/">
            <button className="btn  bg-sky-500 text-white">Back To Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
