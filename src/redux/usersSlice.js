import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, serverTimestamp } from "firebase/firestore";
import db from "../firebaseConfig";

// Async action to create a user
export const createUser = createAsyncThunk("users/createUser", async ({ userId, userData }) => {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, { ...userData, createdAt: serverTimestamp() });
  return { userId, ...userData };
});

// Async action to add an item to the wishlist
export const addToWishlist = createAsyncThunk("users/addToWishlist", async ({ userId, productId }) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    wishlist: arrayUnion(productId),
  });
  return productId;
});

// Async action to remove an item from the wishlist
export const removeFromWishlist = createAsyncThunk("users/removeFromWishlist", async ({ userId, productId }) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    wishlist: arrayRemove(productId),
  });
  return productId;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        if (state.user) {
          state.user.wishlist.push(action.payload);
        }
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        if (state.user) {
          state.user.wishlist = state.user.wishlist.filter((id) => id !== action.payload);
        }
      });
  },
  
});

export default usersSlice.reducer;
