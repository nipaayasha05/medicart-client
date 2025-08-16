import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Slider from "../../pages/Home/Slider";
import CategoryCard from "./categoryCard/CategoryCard";
// import DiscountProduct from "./discountProducts/DiscountProduct";
// import DiscountCard from "./discountProducts/DiscountCard";
import DiscountProduct from "./discountProducts/DiscountProduct";
import axios from "axios";
import Article from "./article/Article";
import Service from "./service/Service";
import { Helmet } from "react-helmet";

const Home = () => {
  // const axiosSecure = useAxiosSecure();

  const { data: slider = [], refetch } = useQuery({
    queryKey: ["slider"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/getHomeAdvertise"
      );

      const sliderImage = data.filter(
        (item) => item.status === "Remove from slide"
      );
      // console.log(sliderImage);

      return sliderImage;
    },
  });

  return (
    <div className="container mx-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>MediCart|Home</title>
      </Helmet>
      <div>
        <Slider slider={slider} />
      </div>

      <div>
        <CategoryCard />
      </div>

      <div className="py-10">
        <DiscountProduct />
      </div>
      <div>
        <Service />
      </div>
      <div>
        <Article />
      </div>
    </div>
  );
};

export default Home;
