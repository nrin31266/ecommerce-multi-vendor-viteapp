import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleAPI from "../../configurations/handleAPI";
import { uploadImage } from "../../utils/Firebase/uploadFile";

export enum EBannerTargetType {
  SHOP = "SHOP",
  PRODUCT = "PRODUCT",
  CATEGORY = "CATEGORY",
  LINK = "LINK",
}

export interface IBanner {
  id: number;
  imageUrl: string;
  title: string;
  targetType: EBannerTargetType;
  target: string;
  active: boolean;
  startDate: string; // ISO 8601 format, ví dụ: "2025-05-08T02:38:14.298Z"
  endDate: string;
}

export interface IBannerRequest {
  imageUrl: string;
  title: string;
  targetType: EBannerTargetType;
  target: string;
  active: boolean;
  startDate: string; // ISO 8601 format, ví dụ: "2025-05-08T02:38:14.298Z"
  endDate: string;
}
interface IBannerState {
  data: IBanner[];
  loading: boolean;
  error: string | null;
  actionLoading: boolean;
}
export const initialState: IBannerState = {
  data: [],
  loading: false,
  error: null,
  actionLoading: false,
};
export const fetchBanner = createAsyncThunk<IBanner[], void>(
  "/banner/fetchBanner",
  async (_, { rejectWithValue }) => {
    try {
      const data = await handleAPI<IBanner[]>({
        endpoint: "/api/banners",
        isAuthenticated: true,
        method: "get",
      });
      console.log("Fetched banner data:", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);
export const addBanner = createAsyncThunk<IBanner, { rq: IBannerRequest; imageFile?: File | null }>(
  "/banner/addBanner",
  async ({ rq, imageFile }, { rejectWithValue }) => {
    try {
      if (imageFile != null) {
        const imageUrl = await uploadImage(imageFile);
        rq.imageUrl = imageUrl;
      }

      const data = await handleAPI<IBanner>({
        endpoint: "/api/banners",
        isAuthenticated: true,
        method: "post",
        body: rq,
      });
      console.log("Added banner data:", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);
export const updateBanner = createAsyncThunk<IBanner, { id: number; rq: IBannerRequest; imageFile?: File | null }>(
  "/banner/updateBanner",
  async ({ id, rq, imageFile }, { rejectWithValue }) => {
    try {
      if (imageFile != null) {
        const imageUrl = await uploadImage(imageFile);
        rq.imageUrl = imageUrl;
      }

      const data = await handleAPI<IBanner>({
        endpoint: `/api/banners/${id}`,
        isAuthenticated: true,
        method: "put",
        body: rq,
      });
      console.log("Updated banner data:", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);
export const deleteBanner = createAsyncThunk<number, number>(
  "/banner/deleteBanner",
  async (id, { rejectWithValue }) => {
    try {
      const data = await handleAPI<number>({
        endpoint: `/api/banners/${id}`,
        isAuthenticated: true,
        method: "delete",
      });
      console.log("Deleted banner data:", data);
      return id;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);
export const bannerSlide =  createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addBanner.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(addBanner.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.data.push(action.payload);
      })
      .addCase(addBanner.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateBanner.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.data.findIndex((banner) => banner.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteBanner.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.data = state.data.filter((banner) => banner.id !== action.payload);
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default bannerSlide.reducer;