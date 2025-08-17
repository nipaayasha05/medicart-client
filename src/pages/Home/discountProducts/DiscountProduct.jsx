import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { EffectCreative, Pagination } from "swiper/modules";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import DiscountCard from "./DiscountCard";

const DiscountProduct = () => {
  // const axiosSecure = useAxiosSecure();
  const { data: discount = [], isLoading } = useQuery({
    queryKey: ["categoryDetails"],
    // enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axios.get(
        "https://assignment-12-server-nine-hazel.vercel.app/discount"
      );
      // console.log(data);
      return data;
    },
  });
  // console.log(discount);
  return (
    <div className="   m-5    border-l-sky-100 bg-orange-50 border-t-sky-100 border-t-4 border-l-4 py-5 rounded-xl transform transition duration-300 hover:scale-105 ">
      <p className="pb-5 font-montserrat   text-center text-sky-500 text-3xl font-bold">
        Discount Products
      </p>

      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        pagination={{
          clickable: "fraction",
        }}
        modules={[EffectCreative, Pagination]}
        className="mySwiper shadow-md"
      >
        {discount.map((dis) => (
          <SwiperSlide dis={dis} key={dis._id} className="relative ">
            <img
              src={dis.image}
              alt={dis.itemName}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <p className="absolute font-open-sans top-2 left-2  bg-orange-300 text-white rounded-full p-2 sm:p- text-sm sm:text-xl ">
              {dis.discount}%
            </p>
            <p className="absolute font-open-sans  top-2 right-2 bg-gray-50  text-gray-700 rounded-full p-1 sm:p- text-sm sm:text-xl ">
              {dis.itemName}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DiscountProduct;
