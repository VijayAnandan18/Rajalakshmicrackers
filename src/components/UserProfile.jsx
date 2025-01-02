import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, addToWishlist, removeFromWishlist } from "../redux/usersSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    pinCode: "",
    password: "",
  });
  const [productId, setProductId] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserSubmit = async () => {
    try {
      const userId = formData.email; // Use email as unique ID
      const hashedPassword = btoa(formData.password); // Simulated hashing
      await dispatch(createUser({ userId, userData: { ...formData, password: hashedPassword, wishlist: [] } }));
      console.log("User created successfully");
    } catch (error) {
      console.log("Error creating user:", error);
    }
  };
  const handleAddToWishlist = async () => {
    try {
      if (user) {
        await dispatch(addToWishlist({ userId: user.userId, productId }));
        console.log("Product added to wishlist");
      }
    } catch (error) {
      console.log("Error adding product to wishlist:", error);
    }
  };
  const handleRemoveFromWishlist = () => {
    if (user) {
      dispatch(removeFromWishlist({ userId: user.userId, productId }));
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form>
        {Object.keys(formData).map((field) => (
          <div key={field}>
            <label>{field}</label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <button type="button" onClick={handleUserSubmit}>
          Save Profile
        </button>
      </form>
      {user && (
        <div>
          <h3>Wishlist</h3>
          <input
            type="text"
            placeholder="Enter product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <button type="button" onClick={handleAddToWishlist}>
            Add to Wishlist
          </button>
          <button type="button" onClick={handleRemoveFromWishlist}>
            Remove from Wishlist
          </button>
          <ul>
            {user.wishlist.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
