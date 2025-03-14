import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/ProductTypes";
import handleAPI from "../../configurations/handleApi";

export const fetchSellerProducts = createAsyncThunk<Product[]>(
  "/sellerProduct/fetchSellerProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await handleAPI<Product[]>({
        endpoint: "/api/sellers/products",
        method: "get",
        isAuthenticated: true, 
      });
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

export const createProduct = createAsyncThunk<
  Product,
  {request: any }
>(
  "/sellerProduct/createProduct",
  async ({ request }, { rejectWithValue }) => {
    try {
      return await handleAPI<Product>({
        endpoint: "/api/sellers/products",
        method: "post",
        body: request,
        isAuthenticated: true,
      });
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

interface SellerProductState {
  product: Product[];
  loading: boolean;
  error: string;
}

const initState: SellerProductState = {
  product: [],
  loading: false,
  error: "",
};

const sellerProductSlice = createSlice({
  name: "sellerProduct",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sellerProductSlice.reducer;
