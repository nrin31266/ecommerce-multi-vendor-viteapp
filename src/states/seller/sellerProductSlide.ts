import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../configurations/api";
import { Product } from "../../types/ProductTypes";

export const fetchSellerProducts = createAsyncThunk<Product[], any>(
  "/sellerProduct/fetchSellerProducts",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/sellers/products", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

    console.log("Seller products: ", response.data);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createProduct = createAsyncThunk<
  Product,
  { jwt: string | null; request: any }
>("/sellerProduct/createProduct", async (args, { rejectWithValue }) => {
  const { jwt, request } = args;
  try {
    const response = await api.post("/api/sellers/products", request, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
});

interface SellerProductState {
  product: Product[];
  loading: boolean;
  error: any;
}

const initState: SellerProductState = {
  product: [],
  loading: false,
  error: null,
};

const sellerProductSlide = createSlice({
  name: "sellerProduct",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSellerProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSellerProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchSellerProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product.push(action.payload);
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default sellerProductSlide.reducer;
