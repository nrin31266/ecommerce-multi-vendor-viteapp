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
      <p className="text-xl font-bold text-center pb-9">
        Pickup Address Details
      </p>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12">
          <TextField
            fullWidth
            required
            name="pickupAddress.province"
            label="Province"
            value={formik.values.pickupAddress.province}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.province &&
              Boolean(formik.errors.pickupAddress?.province)
            }
            helperText={
              formik.touched.pickupAddress?.province &&
              formik.errors.pickupAddress?.province
            }
          />
        </div>
        {/* district */}
        <div className="col-span-12">
          <TextField
            fullWidth
            required
            name="pickupAddress.district"
            label="District"
            value={formik.values.pickupAddress.district}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.district &&
              Boolean(formik.errors.pickupAddress?.district)
            }
            helperText={
              formik.touched.pickupAddress?.district &&
              formik.errors.pickupAddress?.district
            }
          />
        </div>
        {/* ward */}
        <div className="col-span-12">
          <TextField
            fullWidth
            required
            name="pickupAddress.ward"
            label="Ward"
            value={formik.values.pickupAddress.ward}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.ward &&
              Boolean(formik.errors.pickupAddress?.ward)
            }
            helperText={
              formik.touched.pickupAddress?.ward &&
              formik.errors.pickupAddress?.ward
            }
          />
        </div>
        {/* street */}
        <div className="col-span-12">
          <TextField
            fullWidth
            required
            name="pickupAddress.street"
            label="Street"
            value={formik.values.pickupAddress.street}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.street &&
              Boolean(formik.errors.pickupAddress?.street)
            }
            helperText={
              formik.touched.pickupAddress?.street &&
              formik.errors.pickupAddress?.street
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SellerAccountFormStep4;
