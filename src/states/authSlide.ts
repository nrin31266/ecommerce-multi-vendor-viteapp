import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleAPI from "../configurations/handleAPI";
import { EUserRole, IUser } from "../types/UserTypes";
import { NavigateFunction, NavigateProps } from "react-router-dom";

export const sendLoginSignupOtp = createAsyncThunk(
  "/sellers/sendLoginSignupOtp",
  async (
    { email, role }: { email: string; role: EUserRole },
    { rejectWithValue }
  ) => {
    try {
      return await handleAPI({
        endpoint: "/auth/send-login-signup-otp",
        method: "post",
        body: { email, role },
      });
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const signing = createAsyncThunk(
  "/auth/signing",
  async (
    {
      email,
      role,
      otp,
      navigate,
    }: {
      email: string;
      role: EUserRole;
      otp: string;
      navigate: NavigateFunction;
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await handleAPI<{ jwt: string }>({
        endpoint: `/${
          role === EUserRole.ROLE_SELLER ? "sellers" : "auth"
        }/signing`,
        method: "post",
        body: {
          email: role === EUserRole.ROLE_SELLER ?  email : email,
          otp,
        },
      });

      localStorage.setItem("jwt", data.jwt);
      if (role === EUserRole.ROLE_CUSTOMER) {
        navigate("/");
      } else if (role === EUserRole.ROLE_SELLER) {
        navigate("/seller");
      } else if (role === EUserRole.ROLE_ADMIN) {
        navigate("/admin");
      }
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const signup = createAsyncThunk<
  any,
  { email: string; fullName: string; otp: string }
>("/auth/signing", async ({ email, fullName, otp }, { rejectWithValue }) => {
  try {
    const data = await handleAPI<{ jwt: string }>({
      endpoint: `/auth/signup`,
      method: "post",
      body: { email, fullName, otp },
    });

    localStorage.setItem("jwt", data.jwt);

    return data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

export const logout = createAsyncThunk(
  "/auth/logout",
  async ({ navigate }: { navigate: NavigateFunction }) => {
    localStorage.removeItem("jwt");
    navigate("/");
  }
);

export const fetchUserProfile = createAsyncThunk<any>(
  "/users/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const data = await handleAPI({
        endpoint: "/users/profile",
        isAuthenticated: true,
      });

      console.log("User fetched profile data:", data);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

interface AuthStateProps {
  jwt: string;
  otpSent: boolean;
  loggedIn: boolean;
  loading: boolean;
  error: string;
  user: IUser | null;
  successfullyMessage: string;
  role: EUserRole | null;
}
const initState: AuthStateProps = {
  jwt: "",
  otpSent: false,
  loggedIn: false,
  loading: false,
  error: "",
  user: null,
  successfullyMessage: "",
  role: null,
};

const authSlide = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signing.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.successfullyMessage = "";
      })
      .addCase(signing.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.loggedIn = true;
        state.error = "";
        state.successfullyMessage = "Successfully logged in";
      })
      .addCase(signing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loggedIn = true;
      })
      .addCase(sendLoginSignupOtp.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(sendLoginSignupOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.error = "";
        state.successfullyMessage = "OTP sent successfully";
      })
      .addCase(sendLoginSignupOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, () => initState);
  },
});

export default authSlide.reducer;
