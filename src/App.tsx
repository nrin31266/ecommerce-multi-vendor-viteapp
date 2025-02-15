import { Button, ThemeProvider } from "@mui/material";
import "./App.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import customTheme from "./themes/customTheme";
import Navbar from "./customer/components/Navbar/Navbar";
function App() {
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Navbar />
      </ThemeProvider>
    </>
  );
}

export default App;
