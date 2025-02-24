import { ElectricBolt } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { amber } from "@mui/material/colors";
import React from "react";

const OrderItem = () => {
  return (
    <div className="text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer border-gray-200">
      <div className="flex items-center gap-5">
        <div>
          <Avatar sizes="small" sx={{ bgcolor: amber[100] }}>
            <ElectricBolt />
          </Avatar>
        </div>
        <div>
          <h1 className="font-bold text-[var(--primary-color)]">PENDING</h1>
          <p className="font-semibold text-gray-500">Arriving by: 12/12/2022</p>
        </div>
      </div>
      <div className="gap-3 px-5 flex">
        <div>
          <img
            className="w-[70px] object-cover"
            src="https://th.bing.com/th/id/OIP.e943jRQHTUQBM4LXS9w6mgHaHa?rs=1&pid=ImgDetMain"
            alt=""
          />
        </div>
        <div className="w-full space-y-2">
          <h1>iPhone 14</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius rem
            neque libero, aspernatur vitae amet maiores sint nesciunt debitis
          </p>
          <p><strong>Size: </strong>128GB</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
