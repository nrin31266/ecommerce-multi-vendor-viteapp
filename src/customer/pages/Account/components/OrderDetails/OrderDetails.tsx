import { Box, Button, Divider } from "@mui/material";
import React, { useEffect } from "react";
import OrderStepper from "../OrderSteper/OrderStepper";
import { Payment } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../../../states/store";
import { fetchOrderById, fetchOrderItemById } from "../../../../../states/customer/orderSlide";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const dispatch = useAppDispatch();
  const {orderId, orderItemId}= useParams();
  const order = useAppSelector((store) => store.order);
  useEffect(()=>{
    dispatch(fetchOrderById({id: Number.parseInt(orderId!)}));
    dispatch(fetchOrderItemById({id: Number.parseInt(orderItemId!)}));
  },[])

  return (
    <Box className="space-y-5">
      <section className="flex items-center flex-col justify-center border border-gray-200 p-5">
        <img
          className="w-[100px]"
          src={order.orderItem?.product.images[0]}
          alt=""
        />
        <div className="text-sm space-y-1 text-center">
          <h1 className="font-bold">{order.orderItem?.product.title}</h1>
          <p className="text-left">
            {order.orderItem?.product.description}
          </p>
          <p>
            <strong>Size: </strong>{order.orderItem?.size}
          </p>
        </div>
        <div className="mt-5">
          <Button onClick={() => {}}>WRITE REVIEW</Button>
        </div>
      </section>
      <section className="border border-gray-200 px-5">
        <OrderStepper />
      </section>
      <section className="space-y-3 py-5 border border-gray-200 px-5">
        <h1 className="text-xl font-bold">Delivery Address</h1>
        <div className="flex items-center gap-3">
          <span>{order.currentOrder?.shippingAddress.name}</span>
          <Divider orientation="vertical" flexItem />
          <span>{order.currentOrder?.shippingAddress.mobile}</span>
        </div>
        <p className="text-gray-600 text-sm">
          {
            order.currentOrder?.shippingAddress.address + " "
            + order.currentOrder?.shippingAddress.state + " "
            + order.currentOrder?.shippingAddress.city + " "
            + order.currentOrder?.shippingAddress.zipCode

            
          }
        </p>
      </section>

      <section className="border border-gray-200">
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl">Total Item Price</h1>
            <span className="text-xl text-[var(--primary-color)]">
              {order.orderItem?.sellingPrice}
            </span>
          </div>
          <p className="text-gray-600">
            You saved{" "}
            <span className="text-[var(--primary-color-dark)]">{order.orderItem && order.orderItem.mrpPrice - order.orderItem.sellingPrice}</span> on
            this item
          </p>
          <div className="p-3 flex gap-3 bg-[var(--primary-color-light)]">
            <Payment/>
            <p className="text-sm">Pay On Delivery</p>
          </div>
        </div>
        <Divider />
        <div className="p-5 space-y-3">
          <p>
            <strong>Sold by: </strong>
            <span className="text-gray-600">{order.orderItem?.product.seller?.businessDetails.businessName}</span>
          </p>
          <div className="mt-10">
          <Button color="error" fullWidth size="large" variant="outlined">ORDER CANCEL</Button>
          </div>
        </div>
      </section>
    </Box>
  );
};

export default OrderDetails;
