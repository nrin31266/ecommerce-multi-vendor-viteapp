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
      <p className="text-xl font-bold text-center pb-9">Business Details</p>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12">
          <TextField
            fullWidth
            required
            name="businessDetails.businessName"
            label="Business Name"
            value={formik.values.businessDetails.businessName}
            onChange={formik.handleChange}
            error={
              formik.touched.businessDetails?.businessName && Boolean(formik.errors.businessDetails?.businessName)
            }
            helperText={
              formik.touched.businessDetails?.businessName && formik.errors.businessDetails?.businessName
            }
          />
        </div>
        {/* businessEmail */}
        <div className="col-span-12">
          <TextField
            fullWidth
            required
            name="businessDetails.businessEmail"
            label="Business Email"
            value={formik.values.businessDetails.businessEmail}
            onChange={formik.handleChange}
            error={
              formik.touched.businessDetails?.businessEmail && Boolean(formik.errors.businessDetails?.businessEmail)
            }
            helperText={
              formik.touched.businessDetails?.businessEmail && formik.errors.businessDetails?.businessEmail
            }
          />
        </div>
        {/* businessMobile */}
        <div className="col-span-12">
          <TextField
            fullWidth
            required
            name="businessDetails.businessMobile"
            label="Business Mobile"
            value={formik.values.businessDetails.businessMobile}
            onChange={formik.handleChange}
            error={
              formik.touched.businessDetails?.businessMobile && Boolean(formik.errors.businessDetails?.businessMobile)
            }
            helperText={
              formik.touched.businessDetails?.businessMobile && formik.errors.businessDetails?.businessMobile
            }
          />
        </div>
        {/* businessAddress */}
        <div className="col-span-12">
          <TextField
            fullWidth
            required
            name="businessDetails.businessAddress"
            label="Business Address"
            value={formik.values.businessDetails.businessAddress}
            onChange={formik.handleChange}
            error={
              formik.touched.businessDetails?.businessAddress && Boolean(formik.errors.businessDetails?.businessAddress)
            }
            helperText={
              formik.touched.businessDetails?.businessAddress && formik.errors.businessDetails?.businessAddress
            }
          />
        </div>
      </div>
    </Box>
  );
};

export default SellerAccountFormStep2;
