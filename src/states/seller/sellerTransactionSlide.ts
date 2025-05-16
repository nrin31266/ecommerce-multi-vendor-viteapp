import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ISellerOrder } from "../../types/OrderTypes"
import { ISeller } from "../../types/SellerTypes"
import { IUser } from "../../types/UserTypes"
import handleAPI from "../../configurations/handleAPI"

export interface ITransaction {
  id: number
  customer: IUser
  seller: ISeller
  sellerOrder: ISellerOrder
  date: string
}

export interface ITransactionState {
  transactions: ITransaction[]
  loading: boolean
  error: string | null
}

export const initialState: ITransactionState = {
  transactions: [],
  loading: false,
  error: null,
}

export const getSellerTransactions = createAsyncThunk<ITransaction[]>(
  "transaction/getSellerTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await handleAPI<ITransaction[]>({
        endpoint: `/api/transactions/sellers/my`,
        isAuthenticated: true,
      });
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
)

const slide = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSellerTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSellerTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(getSellerTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default slide.reducer