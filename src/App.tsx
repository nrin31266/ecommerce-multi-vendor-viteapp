import { Button, ThemeProvider } from "@mui/material";
import "./App.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import customTheme from "./themes/customTheme";
import Navbar from "./customer/components/Navbar/Navbar";
import Home from './customer/pages/Home/Home';
import Deal from "./customer/pages/Home/components/Deal/Deal";
import Product from "./customer/pages/Product/Product";
import ProductDetail from "./customer/pages/ProductDetail/ProductDetail";
import Review from "./customer/pages/Review/Review";
import Cart from "./customer/pages/Cart/Cart";
import Checkout from "./customer/pages/Checkout/Checkout";
import Account from "./customer/pages/Account/Account";
function App() {
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Navbar />
        {/* <Home/>
        <Product/>
        <ProductDetail/>
        <Review/>
        <Cart/> */}
        {/* <Checkout/> */}
        <Account/>
        
      </ThemeProvider>
    </>
  );
}

export default App;
