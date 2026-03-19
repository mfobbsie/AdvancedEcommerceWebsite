import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs(Router, { children: [_jsx(NavBar, { onCategoryChange: setSelectedCategory }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsxs("section", { id: "center", children: [_jsxs("div", { className: "hero", children: [_jsx("h1", { children: "Welcome to Stitch & Spark!" }), _jsx("p", { children: "Discover a wide range of products at unbeatable prices." })] }), _jsxs("div", { className: "products-overlay", children: [_jsx("h2", { children: "Featured Products" }), _jsx(ProductsList, { selectedCategory: selectedCategory })] })] }) }), _jsx(Route, { path: "/cart", element: _jsx(ViewShoppingCart, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/add-product", element: _jsx(ProtectedRoute, { children: _jsx(AddProductForm, {}) }) }), _jsx(Route, { path: "/edit-product/:id", element: _jsx(ProtectedRoute, { children: _jsx(EditProductForm, {}) }) }), _jsx(Route, { path: "/profile", element: _jsx(ProtectedRoute, { children: _jsx(UserProfile, {}) }) }), _jsx(Route, { path: "/orders", element: _jsx(OrderHistory, {}) }), _jsx(Route, { path: "/orders/:orderId", element: _jsx(OrderDetails, {}) })] })] }));
}
