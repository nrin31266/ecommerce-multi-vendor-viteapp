import { combineReducers, configureStore } from '@reduxjs/toolkit';
 // Thunk không cần destructure
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { thunk } from 'redux-thunk';

// Khai báo rootReducer
const rootReducer = combineReducers({
  // Thêm reducers tại đây
});

// Cấu hình store
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
