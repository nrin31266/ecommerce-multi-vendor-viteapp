import React, { useEffect, useState } from "react";
import CartItem from "./components/CartItem/CartItem";
import { Close, LocalOffer } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import PricingCart from "./components/PricingCard/PricingCart";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../states/store";
import { fetchUserCart } from "../../../states/customer/cartSlide";

const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserCart());
  }, []);

  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="cartItemSection lg:col-span-2 space-y-3">
          {[1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
            <CartItem />
          ))}
        </div>
        <div className="col-span-1 text-sm space-y-3 ">
          <div className="space-y-3">
            <div className="border rounded-md px-5 py-3 space-y-5 border-gray-200">
              <div className="flex- items-center gap-3">
                <LocalOffer
                  className="text-cyan-600"
                  sx={{ fontSize: "2rem" }}
                />
                <span className="text-sm">Apply Coupons</span>
              </div>
              {true ? (
                <div className="flex items-center gap-3">
                  <TextField
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                    }}
                    className="w-full"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Enter coupon code"
                  />
                  <Button disabled={couponCode.length === 0}>Apply</Button>
                </div>
              ) : (
                <div className="flex items-center gap-3 border border-gray-200 px-3 py-1 rounded-md w-max">
                    <span>SPRING2024</span>
                    <span>Applied</span>
                    <IconButton size="small">
                      <Close className="text-red-600"/>
                    </IconButton>
                </div>
              )}
            </div>
            <div className="border border-gray-200 rounded-md">
              <PricingCart/>
              <div className="px-5 pb-5">
                <Button size="large" variant="contained" fullWidth onClick={()=>{
                  navigate("/checkout")
                }}>Buy now</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
