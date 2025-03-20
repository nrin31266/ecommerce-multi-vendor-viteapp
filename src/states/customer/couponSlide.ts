import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICart } from "../../types/CartTypes";
import handleAPI from "../../configurations/handleAPI";
import { ICoupon } from "../../types/CouponTypes";

export const applyCoupon = createAsyncThunk<
  ICart,
  { apply: boolean; code: string; orderValue: number }
>("/coupons/applyCoupon", async (rq, { rejectWithValue }) => {
  try {
    const data = await handleAPI<ICart>({
      endpoint: "/api/coupons/apply",
      method: "post",
      body: rq,
      isAuthenticated: true,
    });

    return data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

export interface ICouponState {
  coupons: ICoupon[];
  cart: ICart | null;
  loading: boolean;
  error: string | null;
  couponCreated: boolean;
  couponApplied: boolean;
}

const initialState: ICouponState = {
  coupons: [],
  cart: null,
  loading: false,
  error: "",
  couponCreated: false,
  couponApplied: false,
};

const couponSlide = createSlice({
  name: "coupon",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.couponApplied = false;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        if (action.meta.arg.apply === true) {
          state.couponApplied = true;
        }
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.couponApplied = false;
      })
      ;
  },
});
export default couponSlide.reducer;