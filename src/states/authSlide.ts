import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleAPI from "../configurations/handleAPI";
import { EUserRole, IUser } from "../types/UserTypes";
import { NavigateFunction, NavigateProps } from "react-router-dom";
import { ISeller } from "../types/SellerTypes";
import { BecomeSellerFormValue } from "../customer/pages/BecomeSeller/components/SellerAccoutForm/SellerAccountForm";

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

export const createSeller = createAsyncThunk<ISeller, {rq: BecomeSellerFormValue}>(
  "/sellers/createSeller",
  async (
    { rq },
    { rejectWithValue }
  ) => {
    try {
      return await handleAPI({
        endpoint: "/sellers",
        method: "post",
        body: rq,
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
      const data = await handleAPI<{ jwt: string, role: EUserRole }>({
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
      localStorage.setItem("role", data.role);
      navigate("/");
      if (data.role === EUserRole.ROLE_CUSTOMER) {
        navigate("/");
      } else if (data.role === EUserRole.ROLE_SELLER) {
        navigate("/seller/account");
      } else if (data.role === EUserRole.ROLE_ADMIN) {
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
>("/auth/signup", async ({ email, fullName, otp }, { rejectWithValue }) => {
  try {
    const data = await handleAPI<{ jwt: string }>({
      endpoint: `/auth/signup`,
      method: "post",
      body: { email, fullName, otp },
    });

    localStorage.setItem("jwt", data.jwt);
    localStorage.setItem("role", EUserRole.ROLE_CUSTOMER);
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
    localStorage.removeItem("role");
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
  currentEmail: string | null;
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
  currentEmail: null,
};

const authSlide = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    restoreAuthFromStorage: (state) => {
      const jwt = localStorage.getItem("jwt");
      const role = localStorage.getItem("role") as EUserRole | null;
      if (jwt && role) {
        state.jwt = jwt;
        state.role = role;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signing.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.successfullyMessage = "";
        state.jwt = "";
        state.role = null;
      })
      .addCase(signing.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.loggedIn = true;
        state.error = "";
        state.successfullyMessage = "";
        state.role = action.payload.role;
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

      builder.addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.successfullyMessage = "";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.loggedIn = true;
        state.error = "";
        state.successfullyMessage = "";
        state.role = EUserRole.ROLE_CUSTOMER;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      builder.addCase(createSeller.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.successfullyMessage = "";
      })
      .addCase(createSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.successfullyMessage = "Otp sent your email";
        state.currentEmail = action.payload.email
      })
      .addCase(createSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export default authSlide.reducer;
export const { restoreAuthFromStorage } = authSlide.actions;
