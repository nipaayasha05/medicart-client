import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Slider from "../../pages/Home/Slider";

const Home = () => {
  const axiosSecure = useAxiosSecure();

  const { data: slider = [], refetch } = useQuery({
    queryKey: ["slider"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/getAdminAdvertise");

      const sliderImage = data.filter(
        (item) => item.status === "Remove from slide"
      );
      console.log(sliderImage);

      return sliderImage;
    },
  });

  return (
    <div>
      <div>
        <Slider slider={slider} />
      </div>
    </div>
  );
};

export default Home;
