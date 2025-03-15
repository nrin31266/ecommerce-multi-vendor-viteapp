import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useAppDispatch } from "../../../../../states/store";
import { sendLoginSignupOtp, signing } from "../../../../../states/authSlide";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      if (!isSentToEmail) {
        handleSentToEmail(values.email);
      } else {
        handleLogin(values.email, values.otp);
      }
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successfullyMessage, setSuccessfullyMessage] = useState("");
  const dispatch = useAppDispatch();

  const [isSentToEmail, setIsSentToEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleMessage = (successfully: string, error: string) => {
    setSuccessfullyMessage(successfully);
    setErrorMessage(error);
  };

  const handleSentToEmail = async (email: string) => {
    setIsLoading(true);
    await dispatch(
      sendLoginSignupOtp({ email: "signing_" + email, role: "ROLE_CUSTOMER" })
    )
      .unwrap()
      .then(() => {
        setIsSentToEmail(true);
        handleMessage("We have sent an OTP to your email. Please check your email and enter the OTP", "")
      })
      .finally(() => setIsLoading(false))
      .catch((error) => {
        handleMessage("", error);
      });

  };

  const handleLogin = async (email: string, otp: string) => {
    setIsLoading(true);
    await dispatch(signing({ email: email, role: "ROLE_CUSTOMER", otp: otp })).unwrap()
      .then(() => navigate("/"))
      .finally(() => setIsLoading(false)).catch((error)=>{
        handleMessage("", error);
      });
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
          {isSentToEmail && (
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
          {errorMessage && (
            <div className="col-span-12 p-y-3">
              <p className="text-sm text-red-500">{errorMessage}</p>
            </div>
          )}
          {
            successfullyMessage && (
              <div className="col-span-12 p-y-3">
                <p className="successfully">{successfullyMessage}</p>
              </div>
            )
          }

          <div className="col-span-12 mt-4">
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              size="large"
            >
              {isSentToEmail ? "Login" : "Send OTP"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
