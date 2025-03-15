import { createAsyncThunk } from "@reduxjs/toolkit";
import handleAPI from "../configurations/handleAPI";

export const sendLoginSignupOtp = createAsyncThunk(
  "/sellers/sendLoginSignupOtp",
  async (
    { email, role }: { email: string; role: string },
    { rejectWithValue }
  ) => {
    try {
      return await handleAPI({
        endpoint: "/auth/send-login-signup-otp",
        method: "post",
        body: { email, role },
      });
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
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
      const data = await handleAPI<{ jwt: string }>({
        endpoint: `/${role === roles.CUSTOMER ? "auth" : "sellers"}/signing`,
        method: "post",
        body: { email, otp },
      });

      localStorage.setItem("jwt", data.jwt);

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

export const signup = createAsyncThunk<any, {email: string, fullName: string, otp:string}>(
  "/auth/signing",
  async (
    { email, fullName, otp },
    { rejectWithValue }
  ) => {
    

    try {
      const data = await handleAPI<{ jwt: string }>({
        endpoint: `/auth/signup`,
        method: "post",
        body: { email, fullName, otp },
      });

      localStorage.setItem("jwt", data.jwt);

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

export const logout = createAsyncThunk(
  "/auth/logout",
  async ({ navigate }: { navigate: any }) => {
    localStorage.clear();
    navigate("/");
  }
);

interface AuthStateProps{
  
}

const initState={}