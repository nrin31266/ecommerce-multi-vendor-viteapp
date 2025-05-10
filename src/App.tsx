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
import { Navigate, Route, Router, Routes, useLocation, useNavigate } from "react-router-dom";
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
import AdminDashboard from "./admin/pages/AdminDashboard/AdminDashboard";
import Sellers from "./admin/pages/Sellers/Sellers";
import Coupon from "./admin/pages/Coupon/Coupon";
import AddNewCoupon from "./admin/pages/AddNewCoupon/AddNewCoupon";

import ElectronicsCategory from "./admin/pages/ElectronicsCategory/ElectronicsCategory";
import ShopByCategory from "./admin/pages/ShopByCategory/ShopByCategory";
import Deals from "./admin/pages/Deals/Deals";
import AdminAccount from "./admin/pages/AdminAccount/AdminAccount";
import HomeCategory from "./admin/pages/HomePage/HomeCategory";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./states/store";
import { fetchSellerProfile } from "./states/seller/sellerSlide";
import Auth from "./customer/pages/Auth/Auth";
import { fetchUserProfile, restoreAuthFromStorage } from "./states/authSlide";
import PaymentSuccess from "./customer/pages/AfterPayment/PaymentSuccess/PaymentSuccess";
import OrderDetails from "./customer/pages/Account/components/OrderDetails/OrderDetails";
import Wishlist from "./customer/pages/Wishlist/Wishlist";
import { useDispatch } from "react-redux";
import { EUserRole } from "./types/UserTypes";
import Banner from "./admin/pages/Banner/Banner";
function App() {
  const dispatch = useAppDispatch();
  const rootDispatch = useDispatch();
  const seller = useAppSelector(store => store.seller);
  const auth = useAppSelector(store => store.auth);
  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
   rootDispatch(restoreAuthFromStorage());
   console.log("Initial app")
  }, []);

  useEffect(() => {
    if(auth.role === "ROLE_SELLER"){
      dispatch(fetchSellerProfile());
    }else if(auth.role === "ROLE_CUSTOMER" || auth.role === "ROLE_ADMIN"){
      dispatch(fetchUserProfile());
    }
  }, [auth.jwt]);

  if(location.pathname === "/" && seller.profile){
    return <Navigate to={"/seller"}/>
  }else if(location.pathname === "/" && auth.user && auth.role === EUserRole.ROLE_ADMIN){
    return <Navigate to={"/admin"}/>
  }

  return (
    <div className="dark">
      <ThemeProvider theme={customTheme}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products/:categoryId" element={<Product/>}/>
          <Route path="/product-details/:productId" element={<ProductDetail/>}/>
          <Route path="/reviews/:productId" element={<Review/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/wishlist" element={<Wishlist/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/payment-success/:orderId" element={<PaymentSuccess/>}/>
          <Route path="/account" element={<Account/>}>
            <Route path="" element={<Profile/>}/>
            <Route path="orders" element={<Orders/>}/>
            <Route path="addresses" element={<Address/>}/>
            <Route path="saved-cards" element={<div>Saved Cards</div>}/>
            <Route path="order/:orderId/:orderItemId" element={<OrderDetails/>}/>
          </Route>
          <Route path="/authentication" element={<Auth/>}/>
          <Route path="/become-seller" element={<BecomeSeller/>}/>
          <Route path="/seller" element={<SellerDashboard/>}>
            <Route path="" element={<Dashboard/>}/>
            <Route path="orders/:tabIndex" element={<OrdersSeller/>}/>
            <Route path="products" element={<Products/>}/>
            <Route path="add-product" element={<AddProduct/>}/>
            <Route path="payment" element={<Payment/>}/>
            <Route path="transaction" element={<Transaction />}/>
            <Route path="account" element={<AccountSeller/>}/>
          </Route>
          <Route path="/admin" element={<AdminDashboard/>}>
            <Route path="" element={<Sellers/>}/>
            <Route path="coupon" element={<Coupon/>}/>
            <Route path="add-new-coupon" element={<AddNewCoupon/>}/>
            <Route path="home-category/:tabIndex" element={<HomeCategory/>}/>
            <Route path="banner" element={<Banner/>}/>
            <Route path="shop-by-category" element={<ShopByCategory/>}/>
            <Route path="deals" element={<Deals/>}/>
            <Route path="account" element={<AdminAccount/>}/>
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
