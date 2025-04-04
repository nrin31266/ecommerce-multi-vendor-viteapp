import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EOrderStatus, IOrder } from "../../types/OrderTypes";
import handleAPI from "../../configurations/handleAPI";

interface ISellerOrderState {
  orders: IOrder[];
  loading: boolean;
  error: null | string;
}

const initialState: ISellerOrderState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchSellerOrders = createAsyncThunk<IOrder[], {orderStatus: EOrderStatus}>(
  "sellerOrder/fetchSellerOrders",
  async ({orderStatus}, { rejectWithValue }) => {
    try {
      const data = await handleAPI<IOrder[]>({
        isAuthenticated: true,
        endpoint: `/api/seller/orders/${orderStatus}`,
      });

      console.log("Fetch seller orders: " + data);

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown Error"
      );
    }
  }
);

export const updateOrderStatus = createAsyncThunk<IOrder, {orderId: number, orderStatus: EOrderStatus}>(
    "sellerOrder/updateOrderStatus", async ({orderId, orderStatus}, {rejectWithValue})=>{
        try {
            const data = await handleAPI<IOrder>({
                endpoint: `/api/seller/orders/${orderId}/status/${orderStatus}`,
                method: "put", 
                isAuthenticated: true
            })
            console.log("Update order status: ", data)
            return data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Unknown Error");
        }
    }
)


const sellerOrderSlide = createSlice({
    initialState: initialState,
    name: "sellerOrder",
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchSellerOrders.pending, (state)=>{
            state.error = null;
            state.loading= true;
        })
        .addCase(fetchSellerOrders.fulfilled, (state, action)=>{
            state.error = null;
            state.loading = false;
            state.orders = action.payload
        })
        .addCase(fetchSellerOrders.rejected, (state, action)=>{
            state.error = action.payload  as string
            state.loading = false
        })

        builder.addCase(updateOrderStatus.pending, (state)=>{
            // state.loading = true,
            state.error = null;
        })
        .addCase(updateOrderStatus.fulfilled, (state, action)=>{
            state.loading = false;
            
            state.orders = state.orders.filter((order)=>order.id !== action.payload.id)
        }).addCase(updateOrderStatus.rejected , (state, action)=>{
            state.loading = false;
            state.error = action.payload as string
        })


    }
})

export default sellerOrderSlide.reducer