import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleAPI from "../configurations/handleAPI";
import { IUser } from "../types/UserTypes";

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



export const fetchUserProfile = createAsyncThunk<any>(
  "/sellers/fetchSellerProfile",
  async (_, { rejectWithValue }) => {
    try {
      const data = await handleAPI({endpoint: "/users/profile", isAuthenticated: true});

      console.log("User fetched profile data:", data);
      return data;
    } catch (error:any) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);


interface AuthStateProps{
  jwt: string,
  otpSent: boolean,
  loggedIn: boolean,
  loading: boolean,
  error: string,
  user: IUser | null,
}
const initState : AuthStateProps={
  jwt: "",
  otpSent: false,
  loggedIn: false,
  loading: false,
  error: "",
  user: null,
}

const authSlide = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signing.pending, (state) => {
        state.loading = true;
      })
      .addCase(signing.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.loggedIn = true;
      })
      .addCase(signing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.loggedIn = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });


      

  }
});

export default authSlide.reducer