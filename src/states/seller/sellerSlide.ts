import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../configurations/api";

export const fetchSellerProfile = createAsyncThunk(
  "/sellers/fetchSellerProfile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("Response: ", response);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);
