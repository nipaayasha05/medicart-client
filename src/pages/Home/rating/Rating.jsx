import React, { useEffect, useState } from "react";
import RatingCard from "./RatingCard";

const Rating = () => {
  const [rating, setRating] = useState([]);
  useEffect(() => {
    fetch("/rating.json")
      .then((res) => res.json())
      .then((data) => {
        setRating(data);
      });
  }, []);
  return (
    <div className="m-5">
      <p className="text-3xl font-montserrat text-sky-500 font-bold text-center py-5  ">
        Your Words, Our Inspiration
      </p>
      <div className="container mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 py-3  ">
        {rating.map((rating) => (
          <RatingCard rating={rating} key={rating.id}></RatingCard>
        ))}
      </div>
    </div>
  );
};

export default Rating;
