import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import orderReducer from "./features/orders/ordersSlice";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

// Persist config for cart and auth
const cartPersistConfig = {
  key: "cart",
  storage,
};

const orderPersistConfig = {
  key: "order",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage,
};

const persistedCart = persistReducer(cartPersistConfig, cartReducer);
const persistedOrder = persistReducer(orderPersistConfig, orderReducer);
const persistedAuth = persistReducer(authPersistConfig, authReducer);

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: persistedCart,
      auth: persistedAuth,
      order: persistedOrder,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware),
  });

// ✅ Infer types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Persistor export (if needed in _app.tsx or layout.tsx)
export const store = makeStore();
export const persistor = persistStore(store);
