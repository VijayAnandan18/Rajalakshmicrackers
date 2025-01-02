import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../firebaseConfig"; // Adjust path to your Firebase config

// Async action to create an order
export const createOrder = createAsyncThunk("orders/createOrder", async ({ userID, orderDetails }) => {
  const orderData = {
    userID,
    orderDetails,
    createdAt: serverTimestamp(),  // Timestamp for the order creation
  };

  const ordersRef = collection(db, "orders");
  const docRef = await addDoc(ordersRef, orderData);  // Add document to Firestore
  return { id: docRef.id, ...orderData };  // Return the document ID and order data
});

// Async action to fetch all orders
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const ordersRef = collection(db, "orders");
  const querySnapshot = await getDocs(ordersRef);  // Fetch all documents from the 'orders' collection
  const orders = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return orders;
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);  // Add the new order to the state
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;  // Set the orders fetched from Firestore
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
