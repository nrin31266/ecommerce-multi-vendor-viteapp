import { Button, ThemeProvider } from "@mui/material";
import "./App.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import customTheme from "./themes/customTheme";
import Navbar from "./customer/components/Navbar/Navbar";
import Home from './customer/pages/Home/Home';
import Deal from "./customer/pages/Home/components/Deal/Deal";
function App() {
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Navbar />
        <Home/>
        
      </ThemeProvider>
    </>
  );
}

export default App;
