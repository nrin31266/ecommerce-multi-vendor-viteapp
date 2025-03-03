import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk';
import { useDispatch, useSelector } from './../../node_modules/react-redux';
import { TypedUseSelectorHook } from './../../node_modules/react-redux/src/types';




const rootReducer = combineReducers({
  
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(thunk)
})

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof rootReducer>;

// export const useAppDispatch = useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;