import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IWishlistState } from "../../types/WishlistType";
import { IWishlist } from './../../types/WishlistType';
import handleAPI from "../../configurations/handleAPI";

export const fetchWishlistByUser = createAsyncThunk<IWishlist>("wishlist/getWishlistByUser", async ( _, { rejectWithValue }) => {
    try {
        const data =await handleAPI<IWishlist>({
            endpoint: `/api/wishlist`,
            method: "get",
            isAuthenticated: true,
        })
        console.log("User fetched wishlist data:", data);
        
        return data
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
});

export const addOrRemoveProductToWishlist = createAsyncThunk<IWishlist, { productId: number }>("wishlist/addOrRemoveProductToWishlist", async ({ productId }, { rejectWithValue }) => {
    try {
        const data = await handleAPI<IWishlist>({
            endpoint: `/api/wishlist/add-product/${productId}`,
            method: "post",
            isAuthenticated: true,
        })
        console.log("User fetched wishlist data:", data);
        return data
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
})


const initialState :IWishlistState = {
    wishlist: null,
    loading: false,
    error: "",
}

const wishlistSlide = createSlice({
    name: "wishlist",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchWishlistByUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchWishlistByUser.fulfilled, (state, action) => {
            state.loading = false;
            state.wishlist = action.payload;
        })
        .addCase(fetchWishlistByUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        builder.addCase(addOrRemoveProductToWishlist.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addOrRemoveProductToWishlist.fulfilled, (state, action) => {
            state.loading = false;
            state.wishlist = action.payload;
        })
        .addCase(addOrRemoveProductToWishlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
})

export default wishlistSlide.reducer