import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Divider, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";
import { ICartItem } from "./../../../../../types/CartTypes";
import { useAppDispatch } from "../../../../../states/store";
import { updateCartItem } from "../../../../../states/customer/cartSlide";

interface ICartItemProps {
  cartItem: ICartItem;
}

const CartItem = ({ cartItem }: ICartItemProps) => {
  const dispatch = useAppDispatch();

  const handleUpdateQuantity = (updateQuantity: number) => {
    dispatch(updateCartItem({ id: cartItem.id, cartItem: {...cartItem, quantity: cartItem.quantity + updateQuantity} }));
  };


  return (
    <div className="border border-gray-200 rounded-md relative">
      <div className="p-5 flex gap-3">
        <img
          className="w-[90px] rounded-md object-cover object-center"
          src={cartItem.product.images[0]}
          alt=""
        />

        <div className="space-y-2">
          <h1 className="font-semibold text-lg ">
            {cartItem.product.seller?.businessDetails.businessName}
          </h1>
          <p className="text-gray-600 font-medium text-sm">
            {cartItem.product.title}
          </p>
          <p className="text-gray-400 text-xs">
            <strong>Sold by: </strong>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          </p>
          <p className="text-sm">7 days replacement available</p>
          <p className="text-gray-500 text-sm">
            <strong>quantity: </strong>
            {cartItem.quantity}
          </p>
        </div>
      </div>
      <Divider />
      <div className="px-5 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2 w-[140px] justify-between">
          <Button
            disabled={cartItem.quantity === 1}
            onClick={() => handleUpdateQuantity(-1)}
            size="small"
          >
            <Remove />
          </Button>
          <span>{cartItem.quantity}</span>
          <Button onClick={() => handleUpdateQuantity(+1)} size="small">
            <Add />
          </Button>
        </div>
        <div>
          <p className="text-gray-700 font-medium">₫100000</p>
        </div>
      </div>
      <div className="absolute right-1 top-1">
        <IconButton>
          <Close className="text-red-600" />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItem;
