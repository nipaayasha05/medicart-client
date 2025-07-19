import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <span className="loading loading-dots loading-xl"></span>
      <span className="loading loading-dots loading-xl"></span>
      <span className="loading loading-dots loading-xl"></span>
    </div>
  );
};

export default Loader;
