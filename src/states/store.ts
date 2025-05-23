import { combineReducers, configureStore } from '@reduxjs/toolkit';
 // Thunk không cần destructure
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { thunk } from 'redux-thunk';
import sellerSlide from './seller/sellerSlide';
import sellerProductSlide from './seller/sellerProductSlide';
import productSlide from './customer/productSlide';
import themeModeSlide from './system/themeModeSlide';
import authSlide from './authSlide';
import cartSlide from './customer/cartSlide';
import orderSlide from './customer/orderSlide';
import wishlistSlide from './customer/wishlistSlide';
import sellerOrderSlide from './seller/sellerOrderSlide';
import homeCategorySlide from './admin/homeCategorySlide';
import bannerSlide from './admin/bannerSlide';
import categorySlide from './admin/categorySlide';
import sellerTransactions from './seller/sellerTransactionSlide';
import sellerReport from './seller/sellerReportSlide';
import adminSellerSlice from './admin/adminSellerSlice';


const rootReducer = combineReducers({
  seller: sellerSlide,
  sellerProduct: sellerProductSlide,
  product: productSlide,
  themeMode: themeModeSlide,
  auth: authSlide,
  cart: cartSlide,
  order: orderSlide,
  wishlist: wishlistSlide,
  sellerOrder: sellerOrderSlide,
  homeCategory: homeCategorySlide,
  adminBanner:  bannerSlide,
  adminCategory: categorySlide,
  sellerTransaction: sellerTransactions,
  sellerReport: sellerReport,
  adminSeller: adminSellerSlice
});


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Định nghĩa type cho Redux
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

// Custom hooks cho useDispatch và useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
