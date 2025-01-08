import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/productsSlice";
import "./AdminProducts.css";

const AdminProducts = () => {
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
    <div className="admin-addproducts">
      <form onSubmit={handleSubmit} className="admin-datacon">
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          className="admin-inputs"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="admin-textar"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="costPrice"
          placeholder="Cost Price"
          className="admin-inputs"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="salePrice"
          placeholder="Sale Price"
          className="admin-inputs"
          onChange={handleChange}
          required
        />
        <select
          name="category"
          className="admin-inputs"
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="sound-based">Sound-Based</option>
          <option value="light-based">Light-Based</option>
          <option value="smoke-based">Smoke-Based</option>
          <option value="aerial">Aerial</option>
          <option value="combination">Combination</option>
        </select>
        <input
          type="number"
          name="stockAvailable"
          placeholder="Stock Available"
          className="admin-inputs"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          className="admin-inputs"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="safetyDistance"
          placeholder="Safety Distance"
          className="admin-inputs"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="ageLimit"
          placeholder="Age Limit"
          className="admin-inputs"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="sound"
          placeholder="Sound Description"
          className="admin-inputs"
          onChange={handleChange}
          required
        />
        {/* Change from file upload to a text input for Image URL */}
        <input
          type="text"
          name="imageURL"
          placeholder="Image URL"
          className="admin-inputs"
          onChange={handleChange}
          required
        />
        <button type="submit" className="admin-add" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AdminProducts;
