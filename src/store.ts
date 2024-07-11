import { configureStore } from '@reduxjs/toolkit'
import {useDispatch, useSelector} from "react-redux";
import {apiSlice} from "./slices/apiSlice.ts";
import cartSliceReducer from "./slices/cartSlice.ts";

const store = configureStore({
    reducer: {
        cart: cartSliceReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>() //
export const useAppSelector = useSelector.withTypes<RootState>()

export default store