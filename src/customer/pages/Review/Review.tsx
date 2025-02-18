import React from "react";
import ReviewCard from "./components/ReviewCard/ReviewCard";
import { Divider } from "@mui/material";

const Review = () => {
  return (
    <div className="p-5 lg:px-20 flex-col flex lg:flex-row gap-20">
      <section className="w-full md:w-1/2 lg:w-[30%] space-y-2">
        <img
          src="https://th.bing.com/th/id/OIP.DCBJx9jrXS6wsBpgxPiNeQHaLH?rs=1&pid=ImgDetMain"
          alt=""
        />
        <div>
          <div>
            <p>Shop name is here</p>
            <p className="text-lg text-gray-600">Men's White Shirt</p>
            <div className="price flex items-center gap-3 mt-3">
              <span className="font-semibold text-gray-800">₫ 400</span>
              <span className="line-through text-gray-400">₫ 999</span>
              <span className="text-[var(--primary-color)]">30%</span>
            </div>
          </div>
        </div>
      </section>
      <section className="space-y-5 w-full">
        {
          [1,1,1,1,1,1,1].map((item)=><div className="space-y-3">
            <ReviewCard/>
            <Divider/>
          </div>)
        }
      </section>
    </div>
  );
};

export default Review;
