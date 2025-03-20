import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types/ProductTypes";
import handleAPI from "../../configurations/handleAPI";
import { uploadImage } from "../../utils/Firebase/uploadFile";

export const fetchSellerProducts = createAsyncThunk<IProduct[]>(
  "/sellerProduct/fetchSellerProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await handleAPI<IProduct[]>({
        endpoint: "/api/sellers/products",
        method: "get",
        isAuthenticated: true,
      });
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const createProduct = createAsyncThunk<IProduct, { request: any, imageFiles?: File[] }>(
  "/sellerProduct/createProduct",
  async ({ request, imageFiles }, { rejectWithValue }) => {
    try {
      if (imageFiles) {
        const uploadedImages = await Promise.all(
          imageFiles.map((file) => uploadImage(file))
        );

        request.images = uploadedImages;
      }


      return await handleAPI<IProduct>({
        endpoint: "/api/sellers/products",
        method: "post",
        body: request,
        isAuthenticated: true,
      });
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk<void, { id: number }>(
  "/sellerProduct/deleteProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      await handleAPI<IProduct>({
        endpoint: `/api/sellers/products/${id}`,
        method: "delete",
        isAuthenticated: true,
      });
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

interface SellerProductState {
  product: IProduct[];
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

    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = state.product.filter(
          (product) => product.id !== action.meta.arg.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sellerProductSlice.reducer;
