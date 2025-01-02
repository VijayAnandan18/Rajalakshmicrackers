import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";

const ProductsList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>Products List</h2>
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
            <img
              src={product.imageURL}
              alt={product.productName}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h3>{product.productName}</h3>
            <p>{product.description}</p>
            <p>
              <strong>₹{product.salePrice}</strong> <del>₹{product.costPrice}</del>
            </p>
            <p>Category: {product.category}</p>
            <p>Stock: {product.stockAvailable}</p>
            <p>Brand: {product.brand}</p>
            <p>sound: {product.sound}</p>
            <p>safetyDistance: {product.safetyDistance}</p>
            <p>ageLimit: {product.ageLimit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
