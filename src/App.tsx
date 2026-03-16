import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavBar from "./NavBar";
import ProductsList from "./ProductsList";
import ViewShoppingCart from "./ViewShoppingCart";
import Login from "./Login";
import Register from "./Register";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <Router>
      <NavBar onCategoryChange={setSelectedCategory} />

      <Routes>
        {/* Home / Products */}
        <Route
          path="/"
          element={
            <section id="center">
              <div className="hero">
                <h1>Welcome to Stitch & Spark!</h1>
                <p>
                  Discover a wide range of products at unbeatable prices. Shop
                  now and experience the best in online shopping!
                </p>
              </div>

              <div className="products container mt-4">
                <h2>Featured Products</h2>
                <ProductsList selectedCategory={selectedCategory} />
              </div>
            </section>
          }
        />

        {/* Cart */}
        <Route path="/cart" element={<ViewShoppingCart />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
