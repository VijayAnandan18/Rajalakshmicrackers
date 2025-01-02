import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../redux/ordersSlice";  // Adjust path to your ordersSlice

const AdminOrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);  // Extract orders from state

  useEffect(() => {
    dispatch(fetchOrders());  // Fetch orders when the component mounts
  }, [dispatch]);

  if (loading) return <p>Loading orders...</p>;  // Show loading state
  if (error) return <p>Error: {error}</p>;  // Show error message if any

  return (
    <div>
      <h2>Admin Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>  // Show message if there are no orders
      ) : (
        <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Total Amount</th>
            <th>Payment Mode</th>
            <th>Payment Status</th>
            <th>Delivery Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userID}</td>
              <td>{order.orderDetails.reduce((total, item) => total + item.totalAmount, 0)} ₹</td>
              <td>{order.orderDetails[0]?.paymentMode}</td>
              <td>{order.orderDetails[0]?.paymentStatus}</td>
              <td>{order.orderDetails[0]?.deliveryStatus}</td>
              <td>{order.createdAt?.toDate().toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
        
      )}
    </div>
  );
};

export default AdminOrdersPage;
