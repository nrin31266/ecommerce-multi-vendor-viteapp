import { Box, Button, IconButton, Modal } from "@mui/material";
import React, { useState } from "react";
import AddressCard from "./components/AddressCard/AddressCard";
import AddressForm from "./components/AddressForm/AddressForm";
import { Close } from "@mui/icons-material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '4px'
};

const Checkout = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleClose = ()=>{
    setIsOpenModal(false);
  }

  const handleOpenModal = ()=>{
    setIsOpenModal(true);
  }

  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
        <div className="space-y-5 lg:grid-cols-3 lg:space-y-0 lg:grid lg:gap-9">
          <div className="col-span-2 space-y-5">
            <div className="flex justify-between items-center">
              <h1 className="font-bold">Select Delivery Address</h1>
              <Button onClick={handleOpenModal} variant="outlined">Add New Address</Button>
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
        </div>
      </div>
      <Modal
        open={isOpenModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        
      >
        <Box sx={ style }>
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Contact Details</h1>
            <IconButton onClick={handleClose}>
              <Close/>
            </IconButton>
          </div>
          <AddressForm/>
          
        </Box>
      </Modal>
    </>
  );
};

export default Checkout;
