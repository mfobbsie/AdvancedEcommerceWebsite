
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavBar from "./NavBar";
import ProductsList from "./ProductsList";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <>
      <NavBar onCategoryChange={setSelectedCategory} />

      <section id="center">
        <div className="hero">
          <h1>Welcome to our online store!</h1>
          <p>
            Discover a wide range of products at unbeatable prices. Shop now and
            experience the best in online shopping!
          </p>
        </div>

        <div className="products container mt-4">
          <h2>Featured Products</h2>
          <ProductsList selectedCategory={selectedCategory} />
        </div>
      </section>
    </>
  );
}
