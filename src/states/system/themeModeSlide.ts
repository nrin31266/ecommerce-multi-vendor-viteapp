import { createSlice } from "@reduxjs/toolkit";

interface IThemeModeState {
    mode: "light" | "dark";
}

const initState: IThemeModeState = {
    mode: localStorage.getItem("themeMode") as "light" | "dark" || "light",
};

const themeModeSlide = createSlice({
    name: "themeMode",
    initialState: initState,
    reducers: {
        setTheme:(state, action)=>{
            state.mode = action.payload

            localStorage.setItem("themeMode", action.payload);
        }
    },
});

export const { setTheme } = themeModeSlide.actions;
export default themeModeSlide.reducer;