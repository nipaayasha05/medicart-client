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
    <div className="bg-gradient-to-r from-sky-200    to-lime-50 border-l-sky-300 border-t-sky-200 border-t-2 border-l-2 py-5 rounded-xl">
      <p className="pb-5  text-center text-sky-600 text-3xl font-bold">
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
        className="mySwiper"
      >
        {discount.map((dis) => (
          <SwiperSlide dis={dis} key={dis._id}>
            <img
              src={dis.image}
              alt={dis.itemName}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DiscountProduct;
