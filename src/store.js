import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./features/admin/adminSlice";

import orderReducer from "./features/order/orderSlice";

import { authApi } from "./services/authApi";
import { ordersApi } from "./services/ordersApi";

export const store = configureStore({
  reducer: {
    order: orderReducer,
    admin: adminReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ordersApi.middleware),
});
