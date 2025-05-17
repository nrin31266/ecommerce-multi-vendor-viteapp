import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EAccountStatus, ISeller } from "../../types/SellerTypes";
import handleAPI from "../../configurations/handleAPI";

export interface AdminSellerState {
  sellers: ISeller[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminSellerState = {
  sellers: [],
  loading: false,
  error: "",
};

export const getSellers = createAsyncThunk<ISeller[]>(
  "adminSeller/getSellers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await handleAPI<ISeller[]>({
        endpoint: "/api/admin/sellers",
        isAuthenticated: true,
      });
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const updateSellerAccountStatus = createAsyncThunk<
  ISeller,
  { sellerId: number; status: EAccountStatus }
>(
  "adminSeller/updateSellerAccountStatus",
  async ({ sellerId, status }, { rejectWithValue }) => {
    try {
      const response = await handleAPI<ISeller>({
        endpoint: `/api/admin/sellers/${sellerId}/status/${status}`,
        method: "put",
        isAuthenticated: true,
      });
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

const adminSellerSlice = createSlice({
  name: "adminSeller",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSellers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSellers.fulfilled, (state, action) => {
      state.loading = false;
      state.sellers = action.payload;
    });
    builder.addCase(getSellers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateSellerAccountStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSellerAccountStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.sellers = state.sellers.map((seller) => {
        if (seller.id === action.payload.id) {
          return action.payload;
        }
        return seller;
      });
    });
    builder.addCase(updateSellerAccountStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default adminSellerSlice.reducer;
