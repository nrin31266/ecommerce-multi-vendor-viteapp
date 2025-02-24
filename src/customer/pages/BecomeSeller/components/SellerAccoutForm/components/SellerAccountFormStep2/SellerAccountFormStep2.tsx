import { Box, TextField } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import { BecomeSellerFormValue } from "../../SellerAccountForm";

const SellerAccountFormStep2 = ({
  formik,
}: {
  formik: FormikProps<BecomeSellerFormValue>;
}) => {
  return (
    <Box>
      <p className="text-xl font-bold text-center pb-9">Pickup Address</p>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12">
          <TextField
            fullWidth
            name="pickupAddress.name"
            label="Name"
            value={formik.values.pickupAddress.name}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.name &&
              Boolean(formik.errors.pickupAddress?.name)
            }
            helperText={
              formik.touched.pickupAddress?.name &&
              formik.errors.pickupAddress?.name
            }
          />
        </div>
        <div className="col-span-6">
          <TextField
            fullWidth
            name="pickupAddress.mobile"
            label="Mobile"
            value={formik.values.pickupAddress.mobile}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.mobile &&
              Boolean(formik.errors.pickupAddress?.mobile)
            }
            helperText={
              formik.touched.pickupAddress?.mobile &&
              formik.errors.pickupAddress?.mobile
            }
          />
        </div>
        <div className="col-span-6">
          <TextField
            fullWidth
            name="pickupAddress.address"
            label="Address"
            value={formik.values.pickupAddress.address}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.address &&
              Boolean(formik.errors.pickupAddress?.address)
            }
            helperText={
              formik.touched.pickupAddress?.address &&
              formik.errors.pickupAddress?.address
            }
          />
        </div>
        <div className="col-span-12">
          <TextField
            fullWidth
            name="pickupAddress.locality"
            label="Locality"
            value={formik.values.pickupAddress.locality}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.locality &&
              Boolean(formik.errors.pickupAddress?.locality)
            }
            helperText={
              formik.touched.pickupAddress?.locality &&
              formik.errors.pickupAddress?.locality
            }
          />
        </div>
        <div className="col-span-12">
          <TextField
            fullWidth
            name="pickupAddress.city"
            label="City"
            value={formik.values.pickupAddress.city}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.city &&
              Boolean(formik.errors.pickupAddress?.city)
            }
            helperText={
              formik.touched.pickupAddress?.city &&
              formik.errors.pickupAddress?.city
            }
          />
        </div>
        <div className="col-span-6">
          <TextField
            fullWidth
            name="pickupAddress.state"
            label="State"
            value={formik.values.pickupAddress.state}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.state &&
              Boolean(formik.errors.pickupAddress?.state)
            }
            helperText={
              formik.touched.pickupAddress?.state &&
              formik.errors.pickupAddress?.state
            }
          />
        </div>
        <div className="col-span-6">
          <TextField
            fullWidth
            name="pickupAddress.zipCode"
            label="Zip Code"
            value={formik.values.pickupAddress.zipCode}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.zipCode &&
              Boolean(formik.errors.pickupAddress?.zipCode)
            }
            helperText={
              formik.touched.pickupAddress?.zipCode &&
              formik.errors.pickupAddress?.zipCode
            }
          />
        </div>
      </div>
    </Box>
  );
};

export default SellerAccountFormStep2;
