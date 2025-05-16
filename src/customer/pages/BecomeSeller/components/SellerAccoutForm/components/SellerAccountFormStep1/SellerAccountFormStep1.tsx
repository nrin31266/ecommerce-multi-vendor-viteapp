import { Box, TextField } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import { BecomeSellerFormValue } from "../../SellerAccountForm";

const SellerAccountFormStep1 = ({ formik }: { formik: FormikProps<BecomeSellerFormValue> }) => {
  return (
    <Box>
      <p className="text-xl font-bold text-center pb-9">Personal Details</p>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
           <TextField
           required
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
         
        </div>
        <div className="col-span-12">
           <TextField
            fullWidth
            required
            name="sellerName"
            label="Seller Name"
            value={formik.values.sellerName}
            onChange={formik.handleChange}
            error={formik.touched.sellerName && Boolean(formik.errors.sellerName)}
            helperText={formik.touched.sellerName && formik.errors.sellerName}
          />
        </div>
         <div className="col-span-12">
           <TextField
            fullWidth
            required
            name="mobile"
            label="Mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />
        </div>
        <div className="col-span-12">
           <TextField
            fullWidth
            required
            name="taxCode"
            label="Tax Code"
            value={formik.values.taxCode}
            onChange={formik.handleChange}
            error={formik.touched.taxCode && Boolean(formik.errors.taxCode)}
            helperText={formik.touched.taxCode && formik.errors.taxCode}
          />
        </div>
        
      </div>
    </Box>
  );
};

export default SellerAccountFormStep1;
