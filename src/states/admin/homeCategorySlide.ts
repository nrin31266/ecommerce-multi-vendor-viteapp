import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleAPI from "../../configurations/handleAPI";
import { uploadImage } from "../../utils/Firebase/uploadFile";
import { IHomeCategoryRequest } from "../../admin/pages/HomePage/components/AddUpdateHomeCategoryModel/AddUpdateHomeCategoryModel";

export interface IHomeCategory {
    id: number;
    name: string;
    image: string;
    category1: string;
    category2: string;
    categoryId: string;
    homeCategorySection: EHomeCategorySection;
  }

  export enum EHomeCategorySection {
    ELECTRIC_CATEGORY = "ELECTRIC_CATEGORY",
    MEN_CATEGORY = "MEN_CATEGORY",
    WOMEN_CATEGORY = "WOMEN_CATEGORY",
    HOME_FURNITURE_CATEGORY = "HOME_FURNITURE_CATEGORY",
  }
interface IHomeCategorySlideState {
    data: IHomeCategory[];
    loading: boolean;
    error: string | null;
}

const initialState: IHomeCategorySlideState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchHomeCategory = createAsyncThunk<IHomeCategory[], {section : EHomeCategorySection | null}>(
    "/homeCategory/fetchHomeCategory",
    async ({section}, { rejectWithValue }) => {
        try {
            const params : Record<string, string> = section ? { section: section } : {};

            const data = await handleAPI<IHomeCategory[]>({
                endpoint: "/api/home/categories",
                isAuthenticated: true,
                method: "get",
                params: params,
            });
            console.log("Fetched home category data:", data);
            return data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Unknown error"
            );
        }
    }
);
export const addHomeCategory = createAsyncThunk<IHomeCategory, {rq: IHomeCategoryRequest, imageFile?: File | null}>(
    "/homeCategory/addHomeCategory",
    async ({rq, imageFile}, { rejectWithValue }) => {
        try {
            if (imageFile != null) {
                const imageUrl = await uploadImage(imageFile);
                rq.image = imageUrl;
            }

            const data = await handleAPI<IHomeCategory>({
                endpoint: "/api/home/categories",
                isAuthenticated: true,
                method: "post",
                body: rq,
            });
            console.log("Added home category data:", data);
            return data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Unknown error"
            );
        }
    }
);
export const updateHomeCategory = createAsyncThunk<IHomeCategory, {id: number,rq: IHomeCategoryRequest, imageFile?: File | null}>(
    "/homeCategory/updateHomeCategory",
    async ({id,rq, imageFile}, { rejectWithValue }) => {
        try {
            if (imageFile != null) {
                const imageUrl = await uploadImage(imageFile);
                rq.image = imageUrl;
            }
            const data = await handleAPI<IHomeCategory>({
                endpoint: `/api/home/categories/${id}`,
                isAuthenticated: true,
                method: "put",
                body: rq,
            });
            console.log("Updated home category data:", data);
            return data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Unknown error"
            );
        }
    }
);
export const deleteHomeCategory = createAsyncThunk<number, number>(
    "/homeCategory/deleteHomeCategory",
    async (id, { rejectWithValue }) => {
        try {
            await handleAPI<void>({
                endpoint: `/api/home/categories/${id}`,
                isAuthenticated: true,
                method: "delete",
            });
            console.log("Deleted home category data:", id);
            return id;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Unknown error"
            );
        }
    }
);

const homeCategorySlide =  createSlice({
    name: "homeCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomeCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHomeCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchHomeCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addHomeCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addHomeCategory.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.homeCategorySection == action.meta.arg.rq.homeCategorySection) {
                    state.data.push(action.payload);
                }
            })
            .addCase(addHomeCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateHomeCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateHomeCategory.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.homeCategorySection == action.meta.arg.rq.homeCategorySection) {
                    // Find the index of the item to update
                    const index = state.data.findIndex((item) => item.id === action.payload.id);
                    if (index !== -1) {
                        state.data[index] = action.payload;
                    }
                }

              
            })
            .addCase(updateHomeCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteHomeCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteHomeCategory.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex((item) => item.id === action.payload);
                if (index !== -1) {
                    state.data.splice(index, 1);
                }
            })
            .addCase(deleteHomeCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default homeCategorySlide.reducer;