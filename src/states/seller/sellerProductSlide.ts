import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../configurations/api";
import { Product } from "../../types/ProductTypes";

export const  fetchSellerProducts = createAsyncThunk<Product[], any>(
    "/sellers/fetchSellerProducts",
    async (jwt: string, { rejectWithValue }) => {
        try {
            const response = await api.get("/api/sellers/products", {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })

            return response.data;
        } catch (error) {
            throw error;
        }

    })