import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";

import { useAppDispatch, useAppSelector } from "./../../../../../states/store";
import { sendLoginSignupOtp, signing } from "../../../../../states/authSlide";
import { useNavigate } from "react-router-dom";
import { EUserRole } from "../../../../../types/UserTypes";

const SellerLoginForm = () => {
  const role = EUserRole.ROLE_SELLER;
  const navigate = useNavigate();
  const { auth } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: async (values) => {
      if (!auth.otpSent) {
        await handleSendOtp(values.email);
      } else {
        await handleLogin(values.email, values.otp);
      }
    },
  });

  const handleSendOtp = async (email: string) => {
    await dispatch(
      sendLoginSignupOtp({ email: "signing_" + email, role: role })
    );
  };

  const handleLogin = async (email: string, otp: string) => {
    await dispatch(signing({ email: email, role: role, otp: otp, navigate }));
  };

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

          {auth.otpSent && (
            <>
              {" "}
              <div className="col-span-12 space-y-2">
                <p className="font-medium text-sm opacity-20">
                  Enter OTP code sent to your email
                </p>
                <TextField
                  fullWidth
                  required
                  type="text"
                  name="otp"
                  label="Otp"
                  value={formik.values.otp}
                  onChange={formik.handleChange}
                  error={formik.touched.otp && Boolean(formik.errors.otp)}
                  helperText={formik.touched.otp && formik.errors.otp}
                />
              </div>
            </>
          )}

          {auth.error && (
            <div className="col-span-12 p-y-3">
              <p className="error">{auth.error}</p>
            </div>
          )}
          {auth.successfullyMessage && (
            <div className="col-span-12 p-y-3">
              <p className="successfully">{auth.successfullyMessage}</p>
            </div>
          )}
          <div className="mt-8 col-span-12">
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{ py: "11px" }}
              type="submit"
              disabled={auth.loading}
              loading={auth.loading}
              loadingPosition="start"
            >
              {auth.otpSent ? "Login" : "Send OTP"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SellerLoginForm;
