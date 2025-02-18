import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Divider, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";

const CartItem = () => {
    const handleUpdateQuantity = ()=>{

    }

    const [quantity, setQuantity] = useState(1);
  return (
    <div className="border border-gray-200 rounded-md relative">
      <div className="p-5 flex gap-3">
        <img
          className="w-[90px] rounded-md object-cover"
          src="https://th.bing.com/th/id/R.329f69deeef836986d1541ab7797dff3?rik=R7statpW4z5iLw&pid=ImgRaw&r=0"
          alt=""
        />

        <div className="space-y-2">
          <h1 className="font-semibold text-lg ">Virani Clothing</h1>
          <p className="text-gray-600 font-medium text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum</p>
          <p className="text-gray-400 text-xs">
            <strong>Sold by: </strong>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          </p>
          <p className="text-sm">7 days replacement available</p>
          <p  className="text-gray-500 text-sm" >
            <strong>quantity: </strong>5
          </p>
        </div>
      </div>
      <Divider/>
      <div className="px-5 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2 w-[140px] justify-between">
            <Button disabled={quantity === 1} onClick={()=>handleUpdateQuantity()} size="small">
                <Remove/>
            </Button>
            <span>
                {quantity}
            </span>
            <Button onClick={()=>handleUpdateQuantity()} size="small">
                <Add/>
            </Button>
        </div>
        <div>
            <p className="text-gray-700 font-medium">₫100000</p>
        </div>
      </div>
      <div className="absolute right-1 top-1">
        <IconButton>
            <Close sx={{color: red[800]}}/>
        </IconButton>
      </div>
    </div>
  );
};

export default CartItem;
