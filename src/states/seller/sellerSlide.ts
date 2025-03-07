import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);


interface SellerState {
  sellers : any[],
  selectedSeller : any
  profile: any
  report: any
  loading: boolean
  error: any
}

const initState: SellerState = {
  sellers: [],
  selectedSeller: null,
  profile: null,
  report: null,
  loading: false,
  error: null
}

const sellerSlide = createSlice({
  name: "seller",
  initialState: initState,
  reducers: {

  },
  extraReducers(builder) {
      builder.addCase(fetchSellerProfile.pending, (state)=>{
        state.loading = true
      })
      builder.addCase(fetchSellerProfile.fulfilled, (state, action)=>{
        state.loading = false
        state.profile = action.payload
      })
      builder.addCase(fetchSellerProfile.rejected, (state, action)=>{
        state.loading = false
        state.error = action.payload
      })
  },
})

export default sellerSlide.reducer