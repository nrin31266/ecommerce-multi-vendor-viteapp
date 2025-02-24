import { FormikProps } from "formik";
import React from "react";
import { BecomeSellerFormValue } from "../../SellerAccountForm";
import { TextField } from "@mui/material";

const SellerAccountFormStep3 = ({
  formik,
}: {
  formik: FormikProps<BecomeSellerFormValue>;
}) => {
  return (
    <div>
      <p className="text-xl font-bold text-center pb-9">Bank Details</p>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12">
          <TextField
            fullWidth
            name="bankDetails.accountNumber"
            label="Account Number"
            value={formik.values.bankDetails.accountNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.bankDetails?.accountNumber &&
              Boolean(formik.errors.bankDetails?.accountNumber)
            }
            helperText={
              formik.touched.bankDetails?.accountNumber &&
              formik.errors.bankDetails?.accountNumber
            }
          />
        </div>
        <div className="col-span-12">
          <TextField
            fullWidth
            name="bankDetails.SWIFTCode"
            label="SWIFT Code"
            value={formik.values.bankDetails.SWIFTCode}
            onChange={formik.handleChange}
            error={
              formik.touched.bankDetails?.SWIFTCode &&
              Boolean(formik.errors.bankDetails?.SWIFTCode)
            }
            helperText={
              formik.touched.bankDetails?.SWIFTCode &&
              formik.errors.bankDetails?.SWIFTCode
            }
          />
        </div>
        <div className="col-span-12">
          <TextField
            fullWidth
            name="bankDetails.accountHolderName"
            label="Account Holder Name"
            value={formik.values.bankDetails.accountHolderName}
            onChange={formik.handleChange}
            error={
              formik.touched.bankDetails?.accountHolderName &&
              Boolean(formik.errors.bankDetails?.accountHolderName)
            }
            helperText={
              formik.touched.bankDetails?.accountHolderName &&
              formik.errors.bankDetails?.accountHolderName
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SellerAccountFormStep3;
