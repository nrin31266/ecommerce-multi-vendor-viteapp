import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICategory } from "../../types/ProductTypes";
import handleAPI from "../../configurations/handleAPI";

export interface ICategoriesResponse {
  one: ICategory[];
  two: ICategory[];
  three: ICategory[];
  m2: Record<string, ICategory[]>
  m3: Record<string, ICategory[]>
  m3bym1: Record<string, ICategory[]>
}

interface ICategorySlideState {
  data: ICategoriesResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: ICategorySlideState = {
  data: null,
  loading: false,
  error: null,
};
export const getAllCategories = createAsyncThunk<ICategoriesResponse, void>(
  "category/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = handleAPI<ICategoriesResponse>({
        endpoint: "/categories",
        method: "get",
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);
const categorySlide = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlide.reducer;
