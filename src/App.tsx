// App.tsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import ProductsList from "./ProductsList";
import ViewShoppingCart from "./ViewShoppingCart";
import Login from "./Login";
import Register from "./Register";
import AddProductForm from "./AddProductForm";
import ProtectedRoute from "./ProtectedRoute";
import EditProductForm from "./EditProductForm";
import UserProfile from "./UserProfile";
import OrderHistory from "./OrderHistory";
import OrderDetails from "./OrderDetails";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <Router>
      <NavBar onCategoryChange={setSelectedCategory} />

      <Routes>
        <Route
          path="/"
          element={
            <section id="center">
              <div className="hero">
                <h1>Welcome to Stitch & Spark!</h1>
                <p>Discover a wide range of products at unbeatable prices.</p>
              </div>

              <div className="products-overlay">
                <h2>Featured Products</h2>
                <ProductsList selectedCategory={selectedCategory} />
              </div>
            </section>
          }
        />

        <Route path="/cart" element={<ViewShoppingCart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AddProductForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <ProtectedRoute>
              <EditProductForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
      </Routes>
    </Router>
  );
}
