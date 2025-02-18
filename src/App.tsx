import { Button, ThemeProvider } from "@mui/material";
import "./App.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import customTheme from "./themes/customTheme";
import Navbar from "./customer/components/Navbar/Navbar";
import Home from './customer/pages/Home/Home';
import Deal from "./customer/pages/Home/components/Deal/Deal";
import Product from "./customer/pages/Product/Product";
import ProductDetail from "./customer/pages/ProductDetail/ProductDetail";
function App() {
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Navbar />
        {/* <Home/> */}
        {/* <Product/> */}
        <ProductDetail/>
        
      </ThemeProvider>
    </>
  );
}

export default App;
