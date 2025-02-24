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
import { Route, Router, Routes } from "react-router-dom";
import Profile from "./customer/pages/Account/components/Profile/Profile";
import Orders from "./customer/pages/Account/components/Orders/Orders";
import Address from "./customer/pages/Account/components/Address/Address";
import BecomeSeller from "./customer/pages/BecomeSeller/BecomeSeller";
import SellerDashboard from "./seller/pages/SellerDashboard/SellerDashboard";
import Dashboard from "./seller/pages/Dashboard/Dashboard";
import OrdersSeller  from './seller/pages/Orders/Orders';
import Products from "./seller/pages/Products/Products";
import AddProduct from "./seller/pages/AddProduct/AddProduct";
import Payment from "./seller/pages/Payment/Payment";
import Transaction from "./seller/pages/Transaction/Transaction";
import AccountSeller from './seller/pages/Account/Account';
function App() {
  return (
    <>
      <ThemeProvider theme={customTheme}>
        {/* <Navbar /> */}
        {/* <Home/>
        <Product/>
        <ProductDetail/>
        <Review/>
        <Cart/> */}
        {/* <Checkout/> */}
        {/* <Account/> */}
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products/:categoryId" element={<Product/>}/>
          <Route path="/product-details/:productId" element={<ProductDetail/>}/>
          <Route path="/reviews/:productId" element={<Review/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/account" element={<Account/>}>
            <Route path="" element={<Profile/>}/>
            <Route path="orders" element={<Orders/>}/>
            <Route path="addresses" element={<Address/>}/>
            <Route path="saved-cards" element={<div>Saved Cards</div>}/>
            <Route path="order/:orderId/:orderItemId"/>
          </Route>
          <Route path="/become-seller" element={<BecomeSeller/>}/>
          <Route path="/seller" element={<SellerDashboard/>}>
            <Route path="" element={<Dashboard/>}/>
            <Route path="orders" element={<OrdersSeller/>}/>
            <Route path="products" element={<Products/>}/>
            <Route path="add-product" element={<AddProduct/>}/>
            <Route path="payment" element={<Payment/>}/>
            <Route path="transaction" element={<Transaction />}/>
            <Route path="account" element={<AccountSeller/>}/>
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
