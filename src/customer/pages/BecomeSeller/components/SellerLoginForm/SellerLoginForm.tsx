import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useAppDispatch,  } from './../../../../../states/store';
import { sendLoginSignupOtp, signing } from "../../../../../states/authSlide";
import { useNavigate } from "react-router-dom";


const SellerLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const role = "ROLE_SELLER";
const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: async(values) => {
      if(!isEnterEmail){
        await handleSendOtp(values.email);
      }else{
        await handleLogin(values.email, values.otp);
      }
    },
  });
  const [isEnterEmail, setIsEnterEmail] = useState(false);
  const handleSendOtp = async (email: string) => {
    setIsLoading(true);
    await dispatch(sendLoginSignupOtp({ email: "signing_" + email, role:  role}))
    .then(()=>{
      setIsEnterEmail(true);
    }).finally(()=>{
      setIsLoading(false);
    });

  }
  const dispatch = useAppDispatch();


  const handleLogin = async (email: string, otp: string)=>{
    setIsLoading(true);
    await dispatch(signing({ email:  email, role:  role, otp: otp})).then((data) => {
      navigate("/")
    }).finally(()=>{
      setIsLoading(false);
    });
  }


  return (
    <div className="space-y-5">
      <h1 className="text-center text-xl text-[var(--primary-color)] font-bold">
        Login As Seller
      </h1>
      <form onSubmit={formik.handleSubmit}>
      <div className="mt-10 grid grid-cols-12 gap-5">
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

        {isEnterEmail ? (
          <>
            <div className="col-span-12 space-y-2">
              <p className="font-medium text-sm opacity-20">
                Enter OTP code sent to your email
              </p>
              <TextField
                fullWidth
                required
                type="number"
                
                name="otp"
                label="Otp"
                value={formik.values.otp}
                onChange={formik.handleChange}
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
              />
            </div>
            <div className="mt-8 col-span-12">
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ py: "11px" }}
                type="submit"
                disabled={isLoading}
                loading={isLoading}
                loadingPosition="start"
              >
                Login
              </Button>
            </div>
          </>
        ) : (
          <div className="mt-8 col-span-12">
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{ py: "11px" }}
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              loadingPosition="start"
            >
              Send OTP
            </Button>
          </div>
        )}
      </div>
      </form>
    </div>
  );
};

export default SellerLoginForm;
