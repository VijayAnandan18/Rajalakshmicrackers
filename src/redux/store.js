import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import usersReducer from "./usersSlice";
import ordersReducer from "./ordersSlice"; // Adjust path
const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
    orders: ordersReducer, // Add orders reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the serializable check
    }),
});

export default store;
