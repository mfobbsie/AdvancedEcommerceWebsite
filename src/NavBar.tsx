//dropdown menu for the nav bar that filters products by categories from the Fake Store API
import React from "react";
import { useSelector } from "react-redux";
import type { Product } from "./api";
import { useQuery } from "@tanstack/react-query"; // Correct import for react-query v4+

const NavBar: React.FC = () => {
  const products = useSelector((state: { products: { items: Product[] } }) => state.products.items);

  const categories = Array.from(new Set(products.map(product => product.category)));
  //react query to fetch categories from https://fakestoreapi.com/products/categories
    useQuery("categories", () => fetch("https://fakestoreapi.com/products/categories").then(res => res.json())
    );

  return (
    <nav>
      <ul>
        {categories.map(category => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;