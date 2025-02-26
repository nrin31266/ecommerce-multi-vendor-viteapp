import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  onClose: () => void;
}

const addressFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string().required("Mobile is required"),
  pinCode: Yup.string()
    .required("Pin Code is required")
    .matches(/^[0-9]{6}$/, "Pin Code must be 6 digits"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  locality: Yup.string().required("Locality is required"),
});

const AddressForm = ({ onClose }: Props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      pinCode: "",
      address: "",
      city: "",
      state: "",
      locality: "",
    },
    validationSchema: addressFormSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleClose = () => {
    onClose();
  };

  return (
    <Box>
      <div className="flex justify-between items-center pb-5">
        <h1 className="text-xl font-bold">Contact Details</h1>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </div>
      <form onSubmit={formik.handleSubmit}>
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
              name="pinCode"
              label="PinCode"
              value={formik.values.pinCode}
              onChange={formik.handleChange}
              error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
              helperText={formik.touched.pinCode && formik.errors.pinCode}
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
          <Button type="submit" fullWidth variant="contained" size="large">
            Add New Address
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default AddressForm;
