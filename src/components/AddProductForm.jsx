import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/productsSlice";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);

  const [product, setProduct] = useState({
    productName: "",
    description: "",
    costPrice: 0,
    salePrice: 0,
    category: "",
    stockAvailable: 0,
    imageURL: "",
    brand: "",
    safetyDistance: "",
    ageLimit: 0,
    sound: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(product));
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="productName" placeholder="Product Name" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <input type="number" name="costPrice" placeholder="Cost Price" onChange={handleChange} required />
        <input type="number" name="salePrice" placeholder="Sale Price" onChange={handleChange} required />
        <select name="category" onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="sound-based">Sound-Based</option>
          <option value="light-based">Light-Based</option>
          <option value="smoke-based">Smoke-Based</option>
          <option value="aerial">Aerial</option>
          <option value="combination">Combination</option>
        </select>
        <input type="number" name="stockAvailable" placeholder="Stock Available" onChange={handleChange} required />
        <input type="url" name="imageURL" placeholder="Image URL" onChange={handleChange} required />
        <input type="text" name="brand" placeholder="Brand" onChange={handleChange} required />
        <input type="text" name="safetyDistance" placeholder="Safety Distance" onChange={handleChange} required />
        <input type="number" name="ageLimit" placeholder="Age Limit" onChange={handleChange} required />
        <input type="text" name="sound" placeholder="Sound Description" onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddProductForm;
