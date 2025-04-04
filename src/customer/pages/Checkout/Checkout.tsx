import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import AddressCard from "./components/AddressCard/AddressCard";
import AddressForm from "./components/AddressForm/AddressForm";
import { Close } from "@mui/icons-material";
import PricingCart from "../Cart/components/PricingCard/PricingCart";
import classes from "./Checkout.module.css";
import { useDispatch } from "react-redux";
import { IPickupAddress } from "../../../types/SellerTypes";
import { createOrder } from "../../../states/customer/orderSlide";
import { useAppDispatch, useAppSelector } from "../../../states/store";
import { useNavigate } from "react-router-dom";

const paymentGateways = [
  {
    value: "STRIPE",
    image:
      "https://logos-world.net/wp-content/uploads/2021/03/Stripe-Symbol.png",
    label: "Stripe",
  },

  {
    value: "VNPAY",
    image: "https://assets.topdev.vn/images/2020/08/25/VNPAY-Logo-yGapP.png",
    label: "VNPay",
  },
  {
    value: "CASH_ON_DELIVERY",
    image : "https://www.marketing91.com/wp-content/uploads/2022/03/Cash-on-Delivery.jpg",
    label: "Cash on delivery"

  }
];
const defaultAddress: IPickupAddress={
  address: "28, NB",
  city: "QN",
  locality: "DT",
  mobile: "083232322",
  name: "NVR",
  state: "DX",
  zipCode: "123445",
pinCode:""
}

const Checkout = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<IPickupAddress | null>(

  );
  const navigate = useNavigate()
  const order = useAppSelector(store=>store.order)
  const [paymentGateway, setPaymentGateway] = useState(
    paymentGateways[0].value
  );
  const handleClose = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentGateway(event.target.value);
  };

  const dispatch = useAppDispatch();
  const handleCreateOrder = (newAddress?: IPickupAddress) => {
    dispatch(
      createOrder({
        address: newAddress ?? selectedAddress!,
        paymentGateway: paymentGateway,
        navigate: navigate
      })
    );
  };

  return (
    <>
      <div className="pt-10 px-5 sm:px-10 lg:px-20 min-h-screen">
        <div className="space-y-5 lg:space-y-0 lg:grid lg:gap-9 lg:grid-cols-12">
          <div className="col-span-7 space-y-5">
            <div className="flex justify-between items-center">
              <h1 className="font-bold">Select Delivery Address</h1>
              <Button onClick={handleOpenModal} variant="outlined">
                Add New Address
              </Button>
            </div>

            <div className="text-xs font-medium space-y-5">
              <p className="text-gray-800">Saved Addresses</p>
              <div className="space-y-3">
                {[1, 1, 1].map((item) => (
                  <AddressCard />
                ))}
              </div>
              <div className="py-4 px-5 border border-gray-200 rounded-md">
                <Button onClick={handleOpenModal}>Add New Address</Button>
              </div>
            </div>
          </div>
          <div className="col-span-5 space-y-5">
            <div className="border rounded-md border-gray-200 p-5 space-y-5">
              <div>
                <h1 className="text-center text-lg text-[var(--primary-color)]">
                  Choose Payment Gateway
                </h1>
              </div>
              <FormControl className="w-full">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  onChange={handlePaymentChange}
                  value={paymentGateway}
                >
                  <div className="flex flex-wrap gap-3 items-center">
                    {paymentGateways.map((item) => (
                      <FormControlLabel
                        className="border rounded-md border-gray-200 w-[120px] h-[60px] p-2"
                        value={item.value}
                        control={<Radio />}
                        label={<img src={item.image} alt="" />}
                      />
                    ))}
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
            <div className="border border-gray-200 rounded-md">
              <PricingCart />
              <div className="px-5 pb-5">
                <Button onClick={()=>handleCreateOrder(defaultAddress)} disabled={order.loading && !isOpenModal} size="large" variant="contained" fullWidth>
                  Pay now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isOpenModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className={classes.model}>
          <AddressForm
            onCheckout={(newAddress) => {
              handleCreateOrder(newAddress);
            }}
            onClose={handleClose}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Checkout;
