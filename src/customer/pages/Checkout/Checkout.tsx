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
import './Checkout.css';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  width: 500,
  borderRadius: "4px",
};

const paymentGateways = [
  {
    value: "RAZORPAY",
    image:
      "https://cdn.iconscout.com/icon/free/png-512/free-razorpay-logo-icon-download-in-svg-png-gif-file-formats--payment-gateway-brand-logos-icons-1399875.png?f=webp&w=256",
    label: "Razorpay",
  },
  {
    value: "STRIPE",
    image:
      "https://logos-world.net/wp-content/uploads/2021/03/Stripe-Symbol.png",
    label: "Stripe",
  },
  {
    value: "PAYPAL",
    image:
      "https://static.vecteezy.com/system/resources/previews/009/469/637/original/paypal-payment-icon-editorial-logo-free-vector.jpg",
    label: "Paypal",
  },
  {
    value: "VNPAY",
    image: "https://assets.topdev.vn/images/2020/08/25/VNPAY-Logo-yGapP.png",
    label: "VNPay",
  },
];

const Checkout = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleClose = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setPaymentGateway(event.target.value);
  }

  const [paymentGateway, setPaymentGateway] = useState(paymentGateways[0].value);

  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
        <div className="space-y-5 lg:grid-cols-3 lg:space-y-0 lg:grid lg:gap-9">
          <div className="col-span-2 space-y-5">
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
          <div className="space-y-5">
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
                <Button size="large" variant="contained" fullWidth>
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
        <Box sx={style}>
          <AddressForm onClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default Checkout;
