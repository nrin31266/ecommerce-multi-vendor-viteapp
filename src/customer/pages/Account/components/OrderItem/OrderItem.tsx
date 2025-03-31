import { ElectricBolt } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { amber } from "@mui/material/colors";
import React from "react";
import { IOrder, IOrderItem } from './../../../../../types/OrderTypes';
import { useNavigate } from "react-router-dom";

interface IOrderItemProps {
  item: IOrderItem
  order: IOrder
}
const OrderItem = ({item, order}:IOrderItemProps) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=> navigate(`/account/order/${order.id}/${item.id}`)} className="text-sm bg-white p-5 space-y-4 cursor-pointer not-last:border-b border-gray-200">
      <div className="flex items-center gap-5">
        <div>
          <Avatar sizes="small" sx={{ bgcolor: amber[100] }}>
            <ElectricBolt />
          </Avatar>
        </div>
        <div>
          <h1 className="font-bold text-[var(--primary-color)]">{order.orderStatus}</h1>
          <p className="font-semibold text-gray-500">Arriving by: {order.deliverDate}</p>
        </div>
      </div>
      <div className="gap-3 px-5 flex">
        <div>
          <img
            className="w-[70px] object-cover"
            src={item.product.images[0]}
            alt=""
          />
        </div>
        <div className="w-full space-y-2">
          <h1>{item.product.seller?.businessDetails.businessName}</h1>
          <p>
            {
              item.product.title
            }
          </p>
          <p><strong>Size: </strong>{item.size}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
