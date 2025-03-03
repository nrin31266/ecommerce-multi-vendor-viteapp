import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../configurations/api";

export const sendLoginSignupOtp = createAsyncThunk(
  "/sellers/sendLoginSignupOtp",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/send-login-signup-otp", { email: email });

      console.log("Response: ", response);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);
