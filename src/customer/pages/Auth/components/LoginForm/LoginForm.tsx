import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../states/store";
import { sendLoginSignupOtp, signing } from "../../../../../states/authSlide";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const { auth } = useAppSelector((store) => store);
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      if (!auth.otpSent) {
        handleSentToEmail(values.email);
      } else {
        handleLogin(values.email, values.otp);
      }
    },
  });

  const dispatch = useAppDispatch();



  const handleSentToEmail = async (email: string) => {
    await dispatch(sendLoginSignupOtp({ email: "signing_" + email, role: "ROLE_CUSTOMER" }));
  };

  const handleLogin = async (email: string, otp: string) => {
    await dispatch(signing({ email: email, role: "ROLE_CUSTOMER", otp: otp, navigate }));
  };

  return (
    <div className="space-y-5">
      <h1 className="text-center text-2xl text-[var(--primary-color)] font-bold">
        Login
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-12 gap-5">
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
          {auth.otpSent && (
            <div className="col-span-12 space-y-2">
              <p className="font-medium text-sm opacity-20">
                Enter OTP code sent to your email
              </p>
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
          {auth.error && (
            <div className="col-span-12 p-y-3">
              <p className="text-sm text-red-500">{auth.error}</p>
            </div>
          )}
          {auth.successfullyMessage && (
            <div className="col-span-12 p-y-3">
              <p className="successfully">{auth.successfullyMessage}</p>
            </div>
          )}

          <div className="col-span-12 mt-4">
            <Button
              disabled={auth.loading}
              type="submit"
              fullWidth
              variant="contained"
              size="large"
            >
              {auth.otpSent ? "Login" : "Send OTP"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
