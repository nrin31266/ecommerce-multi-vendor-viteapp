import { Box, Button, Divider } from "@mui/material";
import React from "react";
import OrderStepper from "../OrderSteper/OrderStepper";
import { Payment } from "@mui/icons-material";

const OrderDetails = () => {
  return (
    <Box className="space-y-5">
      <section className="flex items-center flex-col justify-center border border-gray-200 p-5">
        <img
          className="w-[100px]"
          src="https://th.bing.com/th/id/OIP.e943jRQHTUQBM4LXS9w6mgHaHa?rs=1&pid=ImgDetMain"
          alt=""
        />
        <div className="text-sm space-y-1 text-center">
          <h1 className="font-bold">iPhone 14</h1>
          <p className="text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut aperiam
            architecto inventore animi, suscipit neque corrupti alias earum
            tempora iusto voluptas saepe provident laudantium doloremque odit
            numquam, esse officia necessitatibus.
          </p>
          <p>
            <strong>Size: </strong>128GB
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
          <span>Zosh</span>
          <Divider orientation="vertical" flexItem />
          <span>4578345643346</span>
        </div>
        <p className="text-gray-600 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          unde, nostrum tempore recusandae ipsam dolores aut numquam nemo
        </p>
      </section>

      <section className="border border-gray-200">
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl">Total Item Price</h1>
            <span className="text-xl text-[var(--primary-color)]">
              3534756734
            </span>
          </div>
          <p className="text-gray-600">
            You saved{" "}
            <span className="text-[var(--primary-color-dark)]">236465</span> on
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
            <span className="text-gray-600">Vah gdsg hja</span>
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
