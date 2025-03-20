import React from "react";
import DealCard from "./components/DealCard/DealCard";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";

const Deal = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div className="py-5 lg:px-20">
      <div className="flex items-center gap-2 justify-start overflow-auto px-4 flex-nowrap">
        {[1, 1, 1, 1, 1, 1,1,1,1].map((item) => (
          <DealCard />
        ))}
      </div>
      <div className="slider-container">
        {/* <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>7</h3>
          </div>
          <div>
            <h3>8</h3>
          </div>
          <div>
            <h3>9</h3>
          </div>
        </Slider> */}
      </div>
    </div>
  );
};

export default Deal;
