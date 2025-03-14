import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleAPI from "../../configurations/handleApi";

export const fetchSellerProfile = createAsyncThunk(
  "/sellers/fetchSellerProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await handleAPI({endpoint: "/sellers/profile", isAuthenticated: true});
    } catch (error:any) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);


interface SellerState {
  sellers : any[],
  selectedSeller : any
  profile: any
  report: any
  loading: boolean
  error: string
}

const initState: SellerState = {
  sellers: [],
  selectedSeller: null,
  profile: null,
  report: null,
  loading: false,
  error: ""
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
        state.error = action.payload as string
      })
  },
})

export default sellerSlide.reducer