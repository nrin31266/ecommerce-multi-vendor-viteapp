import { Box, TextField } from "@mui/material";
import React from "react";

const SellerAccountFormStep1 = ({ formik }: any) => {
  return (
    <Box>
      <p className="text-xl font-bold text-center pb-9">Contact Details</p>
      <div className="space-y-9 grid grid-cols-12 gap-5">
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
        {/* Mã số thuế (MST) của Việt Nam được gọi là Tax Identification Number (TIN) hoặc Tax Code. */}
        <div className="col-span-6">
          <TextField
            fullWidth
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
