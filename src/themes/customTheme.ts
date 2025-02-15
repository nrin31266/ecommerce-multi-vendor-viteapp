import { createTheme } from "@mui/material";

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--secondary-color");


const customTheme = createTheme ({
    palette: {
        mode: 'light',
        primary:{
            main: primaryColor
        },
        secondary:{
            main: secondaryColor
        }
    }
});

export default customTheme;