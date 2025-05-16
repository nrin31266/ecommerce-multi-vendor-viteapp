import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ICreateSubProductReq,
  IProduct,
  ISubProduct,
  IUpdateSubProductReq,
} from "../../types/ProductTypes";
import handleAPI from "../../configurations/handleAPI";
import { uploadImage } from "../../utils/Firebase/uploadFile";
import { ICreateProductReq } from "../../seller/pages/AddProduct/AddProduct";

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

export const createProduct = createAsyncThunk<
  IProduct,
  { request: ICreateProductReq; imageFiles?: File[] }
>(
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
export const updateProduct = createAsyncThunk<
  IProduct,
  {
    id: number;
    request: ICreateProductReq;
    imageFiles?: File[];
  }
>(
  "/sellerProduct/updateProduct",
  async ({ id, request, imageFiles }, { rejectWithValue }) => {
    try {
      if (imageFiles) {
        const uploadedImages = await Promise.all(
          imageFiles.map((file) => uploadImage(file))
        );
        request.images = request.images.concat(uploadedImages);
      }
      return await handleAPI<IProduct>({
        endpoint: `/api/sellers/products/${id}`,
        method: "put",
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
export const addSubProduct = createAsyncThunk<
  ISubProduct,
  { id: number; rq: ICreateSubProductReq; imageFiles?: File[] }
>(
  "/sellerProduct/addSubProduct",
  async ({ id, rq, imageFiles }, { rejectWithValue }) => {
    try {
      if (imageFiles) {
        const uploadedImages = await Promise.all(
          imageFiles.map((file) => uploadImage(file))
        );

        rq.images = uploadedImages;
      }
      const data = await handleAPI<ISubProduct>({
        endpoint: `/api/sellers/products/sub/${id}`,
        method: "post",
        isAuthenticated: true,
        body: rq,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);
export const updateSubProduct = createAsyncThunk<
  ISubProduct,
  {
    id: number;
    rq: IUpdateSubProductReq;
    imageFiles?: File[];
    productId: number;
  }
>(
  "/sellerProduct/updateSubProduct",
  async ({ id, rq, imageFiles, productId }, { rejectWithValue }) => {
    try {
      if (imageFiles) {
        const uploadedImages = await Promise.all(
          imageFiles.map((file) => uploadImage(file))
        );
        rq.images = [...rq.images, ...uploadedImages];
      }
      const data = await handleAPI<ISubProduct>({
        endpoint: `/api/sellers/products/sub/${id}`,
        method: "put",
        isAuthenticated: true,
        body: rq,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const deleteSubProduct = createAsyncThunk<
  void,
  { id: number; productId: number }
>(
  "/sellerProduct/deleteSubProduct",
  async ({ id, productId }, { rejectWithValue }) => {
    try {
      await handleAPI<ISubProduct>({
        endpoint: `/api/sellers/products/sub/${productId}/delete/${id}`,
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
  isCreateOrUpdateSubproductLoading: boolean;
  currentProduct?: IProduct;
}

const initState: SellerProductState = {
  product: [],
  loading: false,
  error: "",
  isCreateOrUpdateSubproductLoading: false,
  currentProduct: undefined,
};

const sellerProductSlice = createSlice({
  name: "sellerProduct",
  initialState: initState,
  reducers: {
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = undefined;
    },
  },
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

    builder
      .addCase(addSubProduct.pending, (state) => {
        state.isCreateOrUpdateSubproductLoading = true;
      })
      .addCase(addSubProduct.fulfilled, (state, action) => {
        state.isCreateOrUpdateSubproductLoading = false;
        state.product = state.product.map((product) => {
          if (product.id === action.meta.arg.id) {
            return {
              ...product,
              subProducts: [...product.subProducts, action.payload],
            };
          }
          return product;
        });
      })
      .addCase(addSubProduct.rejected, (state, action) => {
        state.isCreateOrUpdateSubproductLoading = false;
        state.error = action.payload as string;
      });

      builder.addCase(updateProduct.pending, (state) => {
        state.isCreateOrUpdateSubproductLoading = true;

      }).addCase(updateProduct.fulfilled, (state, action) => {
        state.isCreateOrUpdateSubproductLoading = false;
        state.product = state.product.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        });
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isCreateOrUpdateSubproductLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(updateSubProduct.pending, (state) => {
        state.isCreateOrUpdateSubproductLoading = true;
      })
      .addCase(updateSubProduct.fulfilled, (state, action) => {
        state.isCreateOrUpdateSubproductLoading = false;
        state.product = state.product.map((product) => {
          if (product.id === action.meta.arg.productId) {
            return {
              ...product,
              subProducts: product.subProducts.map((subProduct) => {
                if (subProduct.id === action.payload.id) {
                  return action.payload;
                }
                return subProduct;
              }),
            };
          }
          return product;
        });
      })
      .addCase(updateSubProduct.rejected, (state, action) => {
        state.isCreateOrUpdateSubproductLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(deleteSubProduct.pending, (state) => {})
      .addCase(deleteSubProduct.fulfilled, (state, action) => {
        state.product = state.product.map((product) => {
          if (product.id === action.meta.arg.productId) {
            return {
              ...product,
              subProducts: product.subProducts.filter(
                (subProduct) => subProduct.id !== action.meta.arg.id
              ),
            };
          }
          return product;
        });
      })
      .addCase(deleteSubProduct.rejected, (state, action) => {
        state.error = action.payload as string;
      });
      
  },
});

export default sellerProductSlice.reducer;
export const { setCurrentProduct, clearCurrentProduct } =
  sellerProductSlice.actions;
