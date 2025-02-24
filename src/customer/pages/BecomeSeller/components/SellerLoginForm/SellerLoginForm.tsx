import { TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";

const SellerLoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: () => {},
  });

  return (
    <div className="space-y-5">
      <h1 className="text-center text-xl text-[var(--primary-color)] font-bold">
        Login As Seller
      </h1>
      <div className="mt-10 grid grid-cols-12 gap-5">
        <div className="col-span-12">
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        {true && (
          <div className="col-span-12 space-y-2">
            <p className="font-medium text-sm opacity-20">Enter OTP code sent to your email</p>
            <TextField
              fullWidth
              name="otp"
              label="Otp"
              value={formik.values.otp}
              onChange={formik.handleChange}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerLoginForm;
