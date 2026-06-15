import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { productAPI } from "./api/productApi";
import { cartReducer } from "./reducer/cartReducer";
import { orderApi } from "./api/orderApi";
import { dashboardApi } from "./api/dashboadApi";
export type RootState = ReturnType<typeof store.getState>;
export const server = import.meta.env.VITE_SERVER;
export const store = configureStore({
reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,


},
middleware: (mid) => mid().concat(
    userAPI.middleware,
    productAPI.middleware,
    orderApi.middleware,
    dashboardApi.middleware
),
});