import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
const CartContext = createContext(undefined);
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) => item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };
    const removeFromCart = (id) => {
        setCartItems((prev) => prev
            .map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
            .filter((item) => item.quantity > 0));
    };
    const clearCart = () => setCartItems([]);
    return (_jsx(CartContext.Provider, { value: { cartItems, addToCart, removeFromCart, clearCart }, children: children }));
}
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx)
        throw new Error("useCart must be used inside CartProvider");
    return ctx;
}
