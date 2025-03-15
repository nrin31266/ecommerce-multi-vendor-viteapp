import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { PageableType, Product } from "../../types/ProductTypes";
import handleAPI from "../../configurations/handleAPI";

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId: string, { rejectWithValue }) => {
    try {
      return await handleAPI<Product>({ endpoint: `/products/${productId}`, method: "get" });
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

export const searchProduct = createAsyncThunk(
  "products/searchProduct",
  async (query: string, { rejectWithValue }) => {
    try {
      const data = await handleAPI<Product[]>({ endpoint: "/products/search", params: { query } });
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

export const fetchAllProduct = createAsyncThunk<Product[], {params: Record<string, string>}>(
  "products/fetchAllProduct",
  async ({params} , { rejectWithValue }) => {
    try{
      const data = await handleAPI<PageableType<Product>>({ endpoint: "/products", params: params });

      console.log(data)

      return data.content;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

interface ProductState {
  product: Product | null;
  products: Product[];
  totalPages: number;
  loading: boolean;
  error: string;
  searchProduct: Product[];
}

const initialState: ProductState = {
  product: null,
  products: [],
  totalPages: 1,
  loading: false,
  error: "",
  searchProduct: [],
};

const productSlide = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(searchProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(searchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchAllProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchAllProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default productSlide.reducer;