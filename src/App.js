import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth
import './App.css';
import AddProductForm from './components/AddProductForm';
import ProductsList from './components/ProductsList';
import UserProfile from './components/UserProfile';
import CreateOrder from './components/CreateOrder';
import AdminOrdersPage from './components/AdminOrdersPage';
import AdminProducts from './components/AdminProducts';
import UserCards from './components/UserCards';
import LoginPage from "./components/LoginPage";

// New function to handle authentication and routing logic
const AppRoutes = () => {
  const [user, setUser] = useState(null); // To manage user authentication state
  const navigate = useNavigate();

  // Check if the user is authenticated or not
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        navigate("/login"); // Redirect to login if not authenticated
      }
    });

    // Cleanup the listener when component unmounts
    return () => unsubscribe();
  }, [navigate]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<ProductsList />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      {user && (
        <>
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/create-order" element={<CreateOrder />} />
          <Route path="/admin-orders" element={<AdminOrdersPage />} />
          <Route path="/admin-products" element={<AdminProducts />} />
          <Route path="/user-cards" element={<UserCards />} />
        </>
      )}

      {/* Add a default route (404) if needed */}
      <Route path="*" element={<h2>404 Page Not Found</h2>} />
    </Routes>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <AppRoutes /> {/* Move Routes to a new component */}
      </Router>
    </div>
  );
}

export default App;
