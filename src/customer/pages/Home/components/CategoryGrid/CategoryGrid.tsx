import React from "react";
import classes from './CategoryGrid.module.css';

const CategoryGrid = () => {
  return (
    <div className={`grid gap-4 grid-cols-12 grid-rows-12 lg:h-[600px] px-5 lg:px-20 ${classes.root}`}>
      <div className="col-span-3 row-span-12 text-white">
        <img
        className=""
          src="https://i.pinimg.com/736x/06/e7/de/06e7dedc173938a97a31a14635f06ae0.jpg"
          alt=""
        />
      </div>
      <div className="col-span-2 row-span-6 text-white">
        <img
          src="https://0.soompi.io/wp-content/uploads/2024/02/28175152/byun-woo-seok-still-01.jpeg"
          alt=""
        />
      </div>
      <div className="col-span-4 row-span-6 text-white">
        <img
          src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/2/21/785872/St-1.jpg"
          alt=""
        />
      </div>
      <div className="col-span-3 row-span-12 text-white">
        <img
          src="https://0.soompi.io/wp-content/uploads/2020/06/21183821/kim-hye-yoon-4-600x900.jpg"
          alt=""
        />
      </div>
      <div className="col-span-4 row-span-6 text-white">
        <img
          src="https://i.pinimg.com/originals/99/cc/5e/99cc5eab65b7b55081cb3dcae3db028e.jpg"
          alt=""
        />
      </div>
      <div className="col-span-2 row-span-6 text-white">
        <img
          src="https://toplist.vn/images/800px/son-tung-m-tp-540939.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default CategoryGrid;
