import React from "react";
import classes from "./ShopByCategoryCard.module.css";

const ShopByCategoryCard = () => {
  return (
    <div
      className={`${classes.root} flex flex-col justify-center items-center cursor-pointer`}
    >
      <div
        className={`${classes.customBorder} group w-[150px] h-[150px] 
            lg:w-[249px] lg:h-[249px] rounded-full bg-[var(--primary-color)]`}
      >
        <img
          className="rounded-full group-hover:scale-95 transition-transform transform-duration-700
            object-cover object-top h-full w-full"
          src="https://tuvanmuasam.com/wp-content/uploads/2020/09/dong-ho-thong-minh-xiaomi-tot-nhat-4.jpg"
          alt=""
        />
      </div>
      <p>Smart Watch</p>
    </div>
  );
};

export default ShopByCategoryCard;
