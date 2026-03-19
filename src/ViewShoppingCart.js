import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCart } from "./CartContext";
import { useState } from "react";
import { useAuth } from "./useAuth";
import { createOrder } from "./createOrder";
import { useNavigate } from "react-router-dom";
export default function ViewShoppingCart() {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const handleCheckout = async () => {
        if (!user) {
            setSuccessMessage("You must be logged in to checkout.");
            return;
        }
        try {
            const orderId = await createOrder(user.uid, cartItems);
            clearCart();
            setSuccessMessage(`Checkout successful! You purchased ${totalItems} items for $${totalPrice.toFixed(2)}.`);
            setTimeout(() => {
                navigate(`/orders/${orderId}`);
            }, 1500);
        }
        catch (error) {
            console.error("Checkout error.", error);
            setSuccessMessage("Something went wrong during checkout.");
        }
    };
    return (_jsxs("div", { className: "container mt-4", children: [_jsx("h2", { children: "Your Cart" }), successMessage && (_jsx("div", { className: "alert alert-success fade show", role: "alert", children: successMessage })), cartItems.length === 0 && _jsx("p", { children: "Your cart is empty." }), _jsx("ul", { className: "list-group", children: cartItems.map((item) => (_jsxs("li", { className: "list-group-item d-flex align-items-center", children: [_jsx("img", { src: item.image, width: 50, className: "me-3", onError: (e) => {
                                e.currentTarget.src = "assets/placeholder.jpg";
                            } }), _jsxs("div", { className: "flex-grow-1", children: [_jsx("strong", { children: item.title }), _jsxs("div", { children: ["$", item.price.toFixed(2), " \u00D7 ", item.quantity] })] }), _jsx("button", { className: "btn-brand-grey", style: { borderRadius: "12px" }, onClick: () => removeFromCart(item.id), children: "Remove" })] }, item.id))) }), cartItems.length > 0 && (_jsxs(_Fragment, { children: [_jsxs("h4", { className: "mt-3", children: ["Total Items: ", totalItems, " \u2014 Total Price: $", totalPrice.toFixed(2)] }), _jsx("button", { className: "btn-brand-yellow mt-2", style: { borderRadius: "12px" }, onClick: clearCart, children: "Clear Cart" }), _jsx("button", { className: "btn-brand-green mt-2 ms-2", style: { borderRadius: "12px" }, onClick: handleCheckout, children: "Checkout" })] }))] }));
}
