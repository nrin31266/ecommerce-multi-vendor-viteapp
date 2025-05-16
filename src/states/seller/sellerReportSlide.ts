import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISeller } from "../../types/SellerTypes";
import handleAPI from "../../configurations/handleAPI";

export interface ISellerReport {
  id: number;
  seller: ISeller;
  grossEarnings: number;
  totalSales: number;
  totalRefunds: number;
  totalTax: number;
  netEarnings: number;
  totalOrders: number;
  canceledOrders: number;
  completedOrders: number;
}

export interface ISellerReportState {
  data: ISellerReport;
  loading: boolean;
  error: string;
}

export const initState = {
  data: {} as ISellerReport,
  loading: false,
  error: "",
};

export const getSellerReport = createAsyncThunk<ISellerReport>(
  "sellerReport/getSellerReport",
  async (_, { rejectWithValue }) => {
    try {
      const response = await handleAPI<ISellerReport>({
        endpoint: `/api/sellers/reports/my`,
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
const slide = createSlice({
  name: "sellerReport",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSellerReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSellerReport.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    });
    builder.addCase(getSellerReport.rejected, (state, { payload }) => {
      state.error = payload as string;
      state.loading = false;
    });
  },
});

export default slide.reducer;