import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleAPI from "../../configurations/handleAPI";
import { ESellerOrderStatus, ISellerOrder } from "../../types/OrderTypes";

interface ISellerOrderState {
  sellerOrder: ISellerOrder[];
  loading: boolean;
  error: string | null;
  actionLoading: boolean;
}

const initialState: ISellerOrderState = {
  sellerOrder: [],
  loading: false,
  error: null,
  actionLoading: false,
};

export const getSellerOrdersByStatus = createAsyncThunk(
  "sellerOrder/getSellerOrdersByStatus",
  async (orderStatus: ESellerOrderStatus, { rejectWithValue }) => {
    try {
      const response = await handleAPI<ISellerOrder[]>({
        endpoint: `/api/seller/orders`,
        isAuthenticated: true,
        params: {
          status: orderStatus,
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const sellerApproveOrder = createAsyncThunk(
  "sellerOrder/sellerApproveOrder",
  async (orderId: number, { rejectWithValue }) => {
    try {
      const response = await handleAPI<ISellerOrder>({
        endpoint: `/api/seller/orders/seller-order/approve/${orderId}`,
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

export const sellerRejectOrder = createAsyncThunk(
  "sellerOrder/sellerRejectOrder",
  async (orderId: number, { rejectWithValue }) => {
    try {
      const response = await handleAPI<ISellerOrder>({
        endpoint: `/api/seller/orders/seller-order/reject/${orderId}`,
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

// /seller-order/{sellerOrderId}/status/{status}
export const sellerUpdateOrderStatus = createAsyncThunk(
  "sellerOrder/sellerUpdateOrderStatus",
  async (
    {
      sellerOrderId,
      status,
    }: { sellerOrderId: number; status: ESellerOrderStatus },
    { rejectWithValue }
  ) => {
    try {
      const response = await handleAPI<ISellerOrder>({
        endpoint: `/api/seller/orders/seller-order/${sellerOrderId}/status/${status}`,
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

const sellerOrderSlide = createSlice({
  initialState: initialState,
  name: "sellerOrder",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSellerOrdersByStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSellerOrdersByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerOrder = action.payload;
      })
      .addCase(getSellerOrdersByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(sellerApproveOrder.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(sellerApproveOrder.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.sellerOrder = state.sellerOrder.filter(
          (sellerOrder) => sellerOrder.id !== action.payload.id
        );
      })
      .addCase(sellerApproveOrder.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(sellerRejectOrder.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(sellerRejectOrder.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.sellerOrder = state.sellerOrder.filter(
          (sellerOrder) => sellerOrder.id !== action.payload.id
        );
      })
      .addCase(sellerRejectOrder.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      });
      builder.addCase(sellerUpdateOrderStatus.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(sellerUpdateOrderStatus.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.sellerOrder = state.sellerOrder.filter(
          (sellerOrder) => sellerOrder.id !== action.payload.id)
      })
      .addCase(sellerUpdateOrderStatus.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default sellerOrderSlide.reducer;
