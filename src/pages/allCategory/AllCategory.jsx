import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import AllCategoryCard from "./AllCategoryCard";
import Loader from "../../components/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllCategory = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allCategories = [], isLoading } = useQuery({
    queryKey: ["allCategory"],

    queryFn: async () => {
      const { data } = await axiosSecure.get(`/category`);
      console.log(data);
      return data;
    },
  });
  if (isLoading) return <Loader />;
  return (
    <div className="container mx-auto">
      <div className="py-10 ">
        <h3 className="text-3xl text-sky-500 font-bold text-center font-montserrat py-5">
          Explore Medicine Categories
        </h3>
        <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {allCategories.map((category) => (
            <AllCategoryCard
              category={category}
              key={category._id}
            ></AllCategoryCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategory;
