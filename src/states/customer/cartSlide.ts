import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart, ICartItem } from "../../types/CartTypes";
import handleAPI from "../../configurations/handleAPI";
import { CalculateInCart } from "../../utils/Calculate/calculateInCart";
import { applyCoupon } from "./couponSlide";

export const fetchUserCart = createAsyncThunk<ICart>(
  "/cart/fetchUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await handleAPI<ICart>({
        endpoint: "/api/cart",
        isAuthenticated: true,
      });

      console.log("User fetched cart data:", data);

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);
interface IAddItemRequest {
  productId: number;
  size: string;
  quantity: number;
}

export const addItemToCart = createAsyncThunk<ICartItem, IAddItemRequest>(
  "/cart/addItemToCart",
  async (rq, { rejectWithValue }) => {
    try {
      const data = await handleAPI<ICartItem>({
        endpoint: "/api/cart/add",
        method: "put",
        body: rq,
        isAuthenticated: true,
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const deleteCartItem = createAsyncThunk<number, number>(
  "/cart/deleteCartItem",
  async (id, { rejectWithValue }) => {
    try {
      await handleAPI<void>({
        endpoint: `/api/cart/item/${id}`,
        method: "delete",
        isAuthenticated: true,
      });

      return id;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const updateCartItem = createAsyncThunk<
  ICartItem,
  { id: number; cartItem: ICartItem }
>("/cart/updateCartItem", async ({ id, cartItem }, { rejectWithValue }) => {
  try {
    const data = await handleAPI<ICartItem>({
      endpoint: `/api/cart/item/${id}`,
      method: "put",
      body: cartItem,
      isAuthenticated: true,
    });

    return data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

interface ICartState {
  cart: ICart | null;
  loading: boolean;
  error: string;
}

const initialState: ICartState = {
  cart: null,
  loading: false,
  error: "",
};

const cartSlide = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    resetCartState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch cart
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        fetchUserCart.fulfilled,
        (state, action: PayloadAction<ICart>) => {
          state.loading = false;
          state.cart = action.payload;
        }
      )
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // add cart item
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        addItemToCart.fulfilled,
        (state, action: PayloadAction<ICartItem>) => {
          if (state.cart) {
            state.cart.cartItems.push(action.payload);
            state.cart.totalMrpPrice = CalculateInCart.sumCartItemMrpPrice(
              state.cart.cartItems
            );
            state.cart.totalSellingPrice =
              CalculateInCart.sumCartItemSellingPrice(state.cart.cartItems);
          }
          state.loading = false;
        }
      )
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // delete
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        deleteCartItem.fulfilled,
        (state, action: PayloadAction<number>) => {
          if (state.cart) {
            state.cart.cartItems = state.cart.cartItems.filter(
              (item) => item.id !== action.payload
            );
            state.cart.totalMrpPrice = CalculateInCart.sumCartItemMrpPrice(
              state.cart.cartItems
            );
            state.cart.totalSellingPrice =
              CalculateInCart.sumCartItemSellingPrice(state.cart.cartItems);
          }
          state.loading = false;
        }
      )
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // update
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        updateCartItem.fulfilled,
        (state, action: PayloadAction<ICartItem>) => {
          if (state.cart) {
            state.cart.cartItems = state.cart.cartItems.map((item) =>
              item.id === action.payload.id ? action.payload : item
            );
            state.cart.totalMrpPrice = CalculateInCart.sumCartItemMrpPrice(
              state.cart.cartItems
            );
            state.cart.totalSellingPrice =
              CalculateInCart.sumCartItemSellingPrice(state.cart.cartItems);
          }
          state.loading = false;
        }
      )
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      });
  },
});
export default cartSlide.reducer;
export const { resetCartState } = cartSlide.actions;
