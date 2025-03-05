import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../configurations/api";

export const sendLoginSignupOtp = createAsyncThunk(
  "/sellers/sendLoginSignupOtp",
  async (
    { email, role }: { email: string; role: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/auth/send-login-signup-otp", {
        email: email,
        role: role,
      });

      console.log("Response: ", response);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);

export const signing = createAsyncThunk(
  "/auth/signing",
  async (
    { email, role, otp }: { email: string; role: string; otp: string },
    { rejectWithValue }
  ) => {
    const roles = {
      SELLER: "ROLE_SELLER",
      CUSTOMER: "ROLE_CUSTOMER",
      ADMIN: "ROLE_ADMIN",
    };
    try {
      const response = await api.post(
        `/${role === roles.CUSTOMER ? "auth" : "sellers"}/signing`,
        { email: email, otp: otp }
      );

      console.log("Response: ", response);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);
