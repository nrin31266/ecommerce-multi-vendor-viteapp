import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import classes from "./AddressForm.module.css";
import { useAppDispatch, useAppSelector } from "../../../../../states/store";
import { IPickupAddress } from "../../../../../types/SellerTypes";

interface Props {
  onClose: () => void;
  onCheckout:  (newAddress: IPickupAddress) => void,

}

const addressFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string().required("Mobile is required"),
  zipCode: Yup.string()
    .required("Pin Code is required")
    .matches(/^[0-9]{6}$/, "Zip Code must be 6 digits"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  locality: Yup.string().required("Locality is required"),
});

const AddressForm = ({ onClose, onCheckout }: Props) => {
  const order = useAppSelector(store=>store.order);
  const dispatch = useAppDispatch();

  const formik = useFormik<IPickupAddress>({
    initialValues: {
      name: "",
      mobile: "",
      address: "",
      city: "",
      state: "",
      locality: "",
      zipCode: "",
      
      pinCode: ""
    },
    validationSchema: addressFormSchema,
    onSubmit:  (values) => {
      onCheckout(values);
    },
  });

  const handleClose = () => {
    onClose();
  };

  return (
    <Box>
      <div className={`flex justify-between items-center pb-5 ${classes.root}`}>
        <h1 className="text-xl font-bold">Contact Details</h1>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </div>
      <form onSubmit={(e)=>formik.handleSubmit(e)}>
        <div className=" grid grid-cols-12 gap-5">
          <div className="col-span-12">
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </div>
          <div className="col-span-6">
            <TextField
              fullWidth
              name="mobile"
              label="Mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </div>
          <div className="col-span-6">
            <TextField
              fullWidth
              name="zipCode"
              label="Zip Code"
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
              helperText={formik.touched.zipCode && formik.errors.zipCode}
            />
          </div>
          <div className="col-span-12">
            <TextField
              fullWidth
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </div>
          <div className="col-span-12">
            <TextField
              fullWidth
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </div>
          <div className="col-span-6">
            <TextField
              fullWidth
              name="state"
              label="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </div>
          <div className="col-span-6">
            <TextField
              fullWidth
              name="locality"
              label="Locality"
              value={formik.values.locality}
              onChange={formik.handleChange}
              error={formik.touched.locality && Boolean(formik.errors.locality)}
              helperText={formik.touched.locality && formik.errors.locality}
            />
          </div>
        </div>
        <div className="mt-8">
          <Button disabled={order.loading} type="submit" fullWidth variant="contained" size="large">
            Add New Address And Checkout
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default AddressForm;
