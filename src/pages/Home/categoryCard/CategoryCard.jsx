import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Category from "./Category";
import axios from "axios";
import Loader from "../../../components/Loader";

const CategoryCard = () => {
  // const axiosSecure = useAxiosSecure();
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["category"],

    queryFn: async () => {
      const { data } = await axios.get(
        `https://assignment-12-server-nine-hazel.vercel.app/manageCategoryCard`
      );
      // console.log(data);
      return data;
    },
  });
  if (isLoading) return <Loader />;

  console.log(categories);
  return (
    <div className="py-10 ">
      <h3 className="text-3xl text-sky-600 font-bold text-center py-5">
        Explore Medicine Categories
      </h3>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {categories.map((category) => (
          <Category category={category} key={category._id}></Category>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
