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
import TopProducts from "./recentProduts/RecentProducts";
import RecentProducts from "./recentProduts/RecentProducts";
import Rating from "./rating/Rating";
import Partners from "./partners/Partners";

const Home = () => {
  // const axiosSecure = useAxiosSecure();

  const { data: slider = [], refetch } = useQuery({
    queryKey: ["slider"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://assignment-12-server-nine-hazel.vercel.app/getHomeAdvertise",
      );

      const sliderImage = data.filter(
        (item) => item.status === "Remove from slide",
      );
      // console.log(sliderImage);

      return sliderImage;
    },
  });

  return (
    <div className="container mx-auto ">
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
      <div>
        <RecentProducts />
      </div>

      <div className="py-">
        <DiscountProduct />
      </div>

      <div>
        <Partners />
      </div>
      <div>
        <Service />
      </div>
      <div>
        <Article />
      </div>

      <div>
        <Rating />
      </div>
    </div>
  );
};

export default Home;
