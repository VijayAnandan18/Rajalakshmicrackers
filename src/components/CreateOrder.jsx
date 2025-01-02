import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../redux/ordersSlice"; // Adjust path to your ordersSlice

const CreateOrder = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users);  // Assuming user info is stored in state
    const { orders, loading, error } = useSelector((state) => state.orders);  // Extract orders from state
    const [orderDetails, setOrderDetails] = useState([
      // Example orderDetails structure
      { productID: "", quantity: 1, salePrice: 100, totalAmount: 100, discountAmount: 0, paymentMode: "Cash on Delivery", paymentStatus: "Pending", deliveryStatus: "Pending" },
    ]);

  const handleInputChange = (index, event) => {
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails[index][event.target.name] = event.target.value;
    setOrderDetails(updatedOrderDetails);
  };

  const handleAddOrder = () => {
    if (user) {
      const userID = user.userId; // Assuming user has a userId
      const orderData = { userID, orderDetails };
      dispatch(createOrder(orderData)); // Dispatching the order creation action
    }
  };


  return (
    <div>
      <h2>Create Order</h2>
      {loading && <p>Loading...</p>}  {/* Display loading state */}
      {error && <p>Error: {error}</p>}  {/* Display error message if any */}
      
      {orderDetails.map((order, index) => (
        <div key={index}>
          <h3>Order {index + 1}</h3>
          {/* Order Inputs */}
          <input
            type="text"
            name="productID"
            value={order.productID}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Product ID"
          />
          <input
            type="number"
            name="quantity"
            value={order.quantity}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Quantity"
          />
          <input
            type="number"
            name="salePrice"
            value={order.salePrice}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Sale Price"
          />
          <input
            type="number"
            name="totalAmount"
            value={order.totalAmount}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Total Amount"
          />
          <input
            type="number"
            name="discountAmount"
            value={order.discountAmount}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Discount Amount"
          />
          <input
            type="text"
            name="paymentMode"
            value={order.paymentMode}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Payment Mode"
          />
          <input
            type="text"
            name="paymentStatus"
            value={order.paymentStatus}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Payment Status"
          />
          <input
            type="text"
            name="deliveryStatus"
            value={order.deliveryStatus}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Delivery Status"
          />
        </div>
      ))}
      
      <button onClick={handleAddOrder}>Place Order</button>
    </div>
  );
};
export default CreateOrder;
