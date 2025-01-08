import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";
import { getAuth } from "firebase/auth"; // Firebase Authentication
import db from "../firebaseConfig"; // Firebase database reference
import { doc, updateDoc, arrayUnion, collection, addDoc } from "firebase/firestore"; // Firestore methods

const ProductsList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [visibleDetails, setVisibleDetails] = useState({});
  
  // State for sorting and category
  const [sortOption, setSortOption] = useState("Relevance");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const toggleDetails = (productId) => {
    setVisibleDetails((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Filter products based on category
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Sorting function
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "Price (Low to High)") {
      return a.salePrice - b.salePrice;
    } else if (sortOption === "Price (High to Low)") {
      return b.salePrice - a.salePrice;
    } else if (sortOption === "Relevance") {
      return new Date(b.createdAt) - new Date(a.createdAt); // Sort by createdAt for relevance
    }
    return 0;
  });

  // Handle Add to Cart
  const handleAddToCart = async (product) => {
    const user = getAuth().currentUser; // Get logged-in user

    if (!user) {
      alert("Please login to add items to your cart.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.email); // Use user's email as ID
      const datasRef = collection(userRef, "datas"); // Reference to "datas" collection
      await addDoc(datasRef, {
        productID: product.id,
        quantity: 1,
        type: "cart", // Indicate this is a cart item
      });
      alert("Product added to Cart!");
    } catch (error) {
      console.error("Error adding product to cart: ", error);
      alert("Error adding product to cart.");
    }
  };

  // Handle Add to Wishlist
  const handleAddToWishlist = async (product) => {
    const user = getAuth().currentUser; // Get logged-in user

    if (!user) {
      alert("Please login to add items to your wishlist.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.email); // Use user's email as ID
      const datasRef = collection(userRef, "datas"); // Reference to "datas" collection
      await addDoc(datasRef, {
        productID: product.id,
        type: "wishlist", // Indicate this is a wishlist item
      });
      alert("Product added to Wishlist!");
    } catch (error) {
      console.error("Error adding product to wishlist: ", error);
      alert("Error adding product to wishlist.");
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>Products List</h2>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Sorting Options */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="Relevance">Relevance</option>
          <option value="Price (Low to High)">Price (Low to High)</option>
          <option value="Price (High to Low)">Price (High to Low)</option>
        </select>
      </div>

      {/* Category Filter */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="category">Category: </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="sound-based">Sound-based</option>
          <option value="light-based">Light-based</option>
          <option value="smoke-based">Smoke-based</option>
          <option value="aerial">Aerial</option>
          <option value="combination">Combination</option>
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {sortedProducts.map((product) => (
          <div key={product.id} className="user-card">
            <div className="user-card-img">
              <img src={product.imageURL} alt={product.productName} />
            </div>
            <div className="user-card-details">
              <h3>{product.productName}</h3>
              <div className="user-card-price-container">
                <div>
                  <strong>₹{product.salePrice}</strong>
                </div>
                <div>
                  <del>₹{product.costPrice}</del>
                </div>
              </div>
            </div>

            <div className="user-card-button-container">
              <button
                className="user-card-button-half user-card-button"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="user-card-button-half user-card-button"
                onClick={() => handleAddToWishlist(product)}
              >
                Add to Wishlist
              </button>
            </div>

            <button
              className="user-card-button-full"
              onClick={() => toggleDetails(product.id)}
            >
              {visibleDetails[product.id] ? "Hide Details" : "Click to View Product"}
            </button>

            {visibleDetails[product.id] && (
              <div style={{ marginTop: "10px", fontSize: "0.9rem" }}>
                <p>Category: {product.category}</p>
                <p>Stock: {product.stockAvailable}</p>
                <p>Brand: {product.brand}</p>
                <p>Sound: {product.sound}</p>
                <p>Safety Distance: {product.safetyDistance}</p>
                <p>Age Limit: {product.ageLimit}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
