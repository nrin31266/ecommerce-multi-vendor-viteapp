import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleAPI from "../../configurations/handleAPI";
import { logout } from "../authSlide";
import { ISeller } from "../../types/SellerTypes";


export const fetchSellerProfile = createAsyncThunk<any>(
  "/sellers/fetchSellerProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await handleAPI({endpoint: "/sellers/profile", isAuthenticated: true});
    } catch (error:any) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

export const acceptTerms = createAsyncThunk<any>(
  "/sellers/acceptTerms",
  async (_, { rejectWithValue }) => {
    try {
      return await handleAPI({endpoint: "/sellers/accept-terms", isAuthenticated: true, method: "put"});
    } catch (error:any) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

export const updateSeller = createAsyncThunk<ISeller, {rq: any}>(
  "/sellers/updateSeller",
  async ({rq}, { rejectWithValue }) => {
    try {
      return await handleAPI({endpoint: "/sellers/profile", isAuthenticated: true, method: "put", body: rq});
    } catch (error:any) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

interface SellerState {
  profile: ISeller | null
  loading: boolean
  error: string,
  isAcceptTermsLoading: boolean,
  isUpdateProfileLoading: boolean
}

const initState: SellerState = {
  profile: null,
  loading: false,
  error: "",
  isAcceptTermsLoading: false,
  isUpdateProfileLoading: false

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

      builder.addCase(logout.fulfilled, () => initState)

      builder.addCase(acceptTerms.pending, (state)=>{
        state.isAcceptTermsLoading = true
      })
      builder.addCase(acceptTerms.fulfilled, (state)=>{
        state.isAcceptTermsLoading = false
        if(state.profile && state.profile.acceptTerms === false){
          state.profile.acceptTerms = true
        }
      })
      builder.addCase(acceptTerms.rejected, (state, action)=>{
        state.isAcceptTermsLoading = false
        state.error = action.payload as string
      })

      builder.addCase(updateSeller.pending, (state)=>{
        state.isUpdateProfileLoading = true
      })
      builder.addCase(updateSeller.fulfilled, (state, action)=>{
        state.isUpdateProfileLoading = false
        state.profile = action.payload
      })
      builder.addCase(updateSeller.rejected, (state, action)=>{
        state.isUpdateProfileLoading = false
        state.error = action.payload as string
      })
  },

})

export default sellerSlide.reducer