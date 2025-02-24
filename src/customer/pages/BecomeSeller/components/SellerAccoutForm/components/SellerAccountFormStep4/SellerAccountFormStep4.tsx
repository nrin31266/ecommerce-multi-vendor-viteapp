import { FormikProps } from "formik";
import React from "react";
import { BecomeSellerFormValue } from "../../SellerAccountForm";
import { TextField } from "@mui/material";

const SellerAccountFormStep4 = ({
  formik,
}: {
  formik: FormikProps<BecomeSellerFormValue>;
}) => {
  return (
    <div>
      <p className="text-xl font-bold text-center pb-9">Supplier Details</p>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12">
          <TextField
            fullWidth
            name="businessDetails.businessName"
            label="Business Name"
            value={formik.values.businessDetails.businessName}
            onChange={formik.handleChange}
            error={
              formik.touched.businessDetails?.businessName &&
              Boolean(formik.errors.businessDetails?.businessName)
            }
            helperText={
              formik.touched.businessDetails?.businessName &&
              formik.errors.businessDetails?.businessName
            }
          />
        </div>

        <div className="col-span-12">
          <TextField
            fullWidth
            name="sellerName"
            label="Seller Name"
            value={formik.values.bankDetails.accountNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.sellerName &&
              Boolean(formik.errors.sellerName)
            }
            helperText={
              formik.touched.sellerName &&
              formik.errors.sellerName
            }
          />
        </div>
        <div className="col-span-12">
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={
              formik.touched.email &&
              Boolean(formik.errors.email)
            }
            helperText={
              formik.touched.email &&
              formik.errors.email
            }
          />
        </div>
        <div className="col-span-12">
          <TextField
            fullWidth
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={
              formik.touched.password &&
              Boolean(formik.errors.password)
            }
            helperText={
              formik.touched.password &&
              formik.errors.password
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SellerAccountFormStep4;
