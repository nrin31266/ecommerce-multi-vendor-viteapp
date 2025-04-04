import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IOrder, IOrderItem } from "../../types/OrderTypes";
import handleAPI from "../../configurations/handleAPI";
import { IPickupAddress } from "../../types/SellerTypes";
import { NavigateFunction } from "react-router-dom";

export interface OrderState {
  orders: IOrder[];
  orderItem: IOrderItem | null;
  currentOrder: IOrder | null;
  paymentOrder: any | null;
  loading: boolean;
  error: string | null;
  orderCanceled: boolean;
}
const initialState: OrderState = {
  orders: [],
  orderItem: null,
  currentOrder: null,
  paymentOrder: null,
  loading: false,
  error: null,
  orderCanceled: false,
};

export const fetchUserOrderHistory = createAsyncThunk<IOrder[]>(
  "/orders/fetchUserOrderHistory",
  async (_, { rejectWithValue }) => {
    try {
      const data = await handleAPI<IOrder[]>({
        endpoint: "/api/orders/user",
        isAuthenticated: true,
      });
      console.log("User fetched order history data:", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const fetchOrderById = createAsyncThunk<IOrder, { id: number }>(
  "/orders/fetchOrderById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await handleAPI<IOrder>({
        endpoint: `/api/orders/${id}`,
        isAuthenticated: true,
      });
      console.log(`User fetched order by id ${id} data:`, data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const fetchOrderItemById = createAsyncThunk<IOrderItem, { id: number }>(
    "/orders/fetchOrderItemById",
    async ({ id }, { rejectWithValue }) => {
      try {
        const data = await handleAPI<IOrderItem>({
          endpoint: `/api/orders/item/${id}`,
          isAuthenticated: true,
        });
        console.log(`User fetched order item by id ${id} data:`, data);
        return data;
      } catch (error) {
        return rejectWithValue(
          error instanceof Error ? error.message : "Unknown error"
        );
      }
    }
  );

export const createOrder = createAsyncThunk<
  any,
  { address: IPickupAddress; paymentGateway: string, navigate: NavigateFunction }
>(
  "/orders/createOrder",
  async ({ address, paymentGateway, navigate }, { rejectWithValue }) => {
    try {
      const data = await handleAPI<any>({
        endpoint: "/api/orders",
        method: "post",
        body: address,
        isAuthenticated: true,
        params: { paymentMethod: paymentGateway },
      });
      console.log("User created order data:", data);

      

      if (data.payment_link_url) {
        window.location.href = data.payment_link_url;
      }


      if(paymentGateway === "CASH_ON_DELIVERY"){
        navigate("/payment-success/cod")
      }
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const paymentSuccess = createAsyncThunk<
  void,
  { id: number; paymentLinkId: string }
>(
  "/payment/paymentSuccess",
  async ({ id, paymentLinkId }, { rejectWithValue }) => {
    try {
      await handleAPI<any>({
        endpoint: `/api/payment/${id}`,
        method: "post",
        isAuthenticated: true,
        params: { paymentLinkId: paymentLinkId },
      });
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const cancelOrder = createAsyncThunk<IOrder, { id: number }>(
  "/orders/cancelOrder",
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await handleAPI<IOrder>({
        endpoint: `/api/orders/${id}/cancel`,
        method: "put",
        isAuthenticated: true,
        params: { orderId: id },
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

const orderSlide = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserOrderHistory.pending, (state)=>{
        state.error = "",
        state.loading = true;
        state.orderCanceled = false;
    })
    .addCase(fetchUserOrderHistory.fulfilled, (state, action)=>{
        state.orders = action.payload;
        state.loading = false;
    })
    .addCase(fetchUserOrderHistory.rejected, (state,action)=>{
        state.error = action.payload as string
        state.loading = false

    });

    builder
    .addCase(fetchOrderById.pending, (state)=>{
        state.error = "",
        state.loading = true;
    })
    .addCase(fetchOrderById.fulfilled, (state, action)=>{
        state.currentOrder = action.payload;
        state.loading = false;
    })
    .addCase(fetchOrderById.rejected, (state,action)=>{
        state.error = action.payload as string
        state.loading = false
    });

    builder
    .addCase(createOrder.pending, (state)=>{
        state.error = "",
        state.loading = true;
    })
    .addCase(createOrder.fulfilled, (state, action)=>{
        state.paymentOrder = action.payload;
        state.loading = false;
    })
    .addCase(createOrder.rejected, (state,action)=>{
        state.error = action.payload as string
        state.loading = false
    });
    
    builder
    .addCase(fetchOrderItemById.pending, (state)=>{
        state.error = "",
        state.loading = true;
    })
    .addCase(fetchOrderItemById.fulfilled, (state, action)=>{
        state.orderItem = action.payload;
        state.loading = false;
    })
    .addCase(fetchOrderItemById.rejected, (state,action)=>{
        state.error = action.payload as string
        state.loading = false
    });

    builder
    .addCase(paymentSuccess.pending, (state)=>{
        state.error = "",
        state.loading = true;
    })
    .addCase(paymentSuccess.fulfilled, (state, _)=>{
        state.loading = false;
        console.log("Payment successful")
    })
    .addCase(paymentSuccess.rejected, (state,action)=>{
        state.error = action.payload as string
        state.loading = false
    });

    builder
    .addCase(cancelOrder.pending, (state)=>{
        state.error = "",
        state.loading = true;
        state.orderCanceled = false
    })
    .addCase(cancelOrder.fulfilled, (state, action)=>{
        state.loading = false;
        state.orders.filter((o)=>o.id !== action.payload.id);
        state.orderCanceled = true;
        state.currentOrder = action.payload;
    })
    .addCase(cancelOrder.rejected, (state,action)=>{
        state.error = action.payload as string
        state.loading = false
    });
    
    
    
  },
});

export default orderSlide.reducer