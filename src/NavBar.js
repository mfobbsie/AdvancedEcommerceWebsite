import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "./fetchCategories";
import { useAuth } from "./useAuth";
import { useUserProfile } from "./useUserProfile";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
export default function NavBar({ onCategoryChange, }) {
    const { user } = useAuth();
    const { profile } = useUserProfile();
    const { cartItems } = useCart();
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });
    const handleLogout = async () => {
        await signOut(auth);
    };
    return (_jsx("header", { children: _jsx("nav", { className: "navbar navbar-expand-lg navbar-light bg-light shadow-sm", children: _jsxs("div", { className: "container", children: [_jsx(Link, { className: "navbar-brand", to: "/", children: _jsx("img", { src: "/assets/logo.svg", alt: "Stitch & Spark Logo" }) }), _jsx("div", { className: "collapse navbar-collapse", id: "navbarNav", children: _jsxs("ul", { className: "navbar-nav ms-auto", children: [_jsx("li", { className: "nav-item", children: _jsx(Link, { className: "nav-link", to: "/", children: "Home" }) }), _jsxs("li", { className: "nav-item dropdown", children: [_jsx("a", { className: "nav-link dropdown-toggle", href: "#", "data-bs-toggle": "dropdown", children: "Categories" }), _jsxs("ul", { className: "dropdown-menu", children: [_jsx("li", { children: _jsx("button", { className: "dropdown-item", onClick: () => onCategoryChange("all"), children: "All" }) }), categories?.map((category) => (_jsx("li", { children: _jsx("button", { className: "dropdown-item text-capitalize", onClick: () => onCategoryChange(category), children: category }) }, category)))] })] }), user && (_jsxs("li", { className: "nav-item dropdown", children: [_jsxs("a", { className: "nav-link dropdown-toggle", href: "#", "data-bs-toggle": "dropdown", children: ["Hello, ", profile?.name || "User"] }), _jsxs("ul", { className: "dropdown-menu dropdown-menu-end", children: [_jsx("li", { children: _jsx(Link, { className: "dropdown-item", to: "/profile", children: "View Profile" }) }), _jsx("li", { children: _jsx(Link, { className: "dropdown-item", to: "/add-product", children: "Add Product" }) }), _jsx("li", { children: _jsx(Link, { className: "dropdown-item", to: "/orders", children: "Order History" }) }), _jsx("li", { children: _jsx("hr", { className: "dropdown-divider" }) }), _jsx("li", { children: _jsx("button", { className: "dropdown-item text-danger", onClick: handleLogout, children: "Logout" }) })] })] })), !user && (_jsxs(_Fragment, { children: [_jsx("li", { className: "nav-item", children: _jsx(Link, { className: "nav-link", to: "/login", children: "Login" }) }), _jsx("li", { className: "nav-item", children: _jsx(Link, { className: "nav-link", to: "/register", children: "Register" }) })] })), _jsx("li", { className: "nav-item", children: _jsxs(Link, { className: "nav-link", to: "/cart", children: ["\uD83D\uDED2 ", totalItems > 0 && _jsxs("span", { children: ["(", totalItems, ")"] })] }) })] }) })] }) }) }));
}
