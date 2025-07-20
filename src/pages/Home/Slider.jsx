import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Slider = ({ slider }) => {
  return (
    <div className="container mx-auto">
      <Carousel
        autoPlay={true}
        interval={2000}
        infiniteLoop={true}
        showThumbs={false}
        // showStatus={false}
        // stopOnHover={false}
        // stopOnInteraction={false}
        // swipeable={true}
        // emulateTouch={true}
      >
        {slider.map((item) => (
          <div key={item._id}>
            <img
              className="w-full h-[70vh] rounded-xl"
              src={item.image}
              alt=""
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
