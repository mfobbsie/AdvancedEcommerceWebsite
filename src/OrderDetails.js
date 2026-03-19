import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
export default function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function loadOrder() {
            if (!orderId)
                return;
            try {
                const ref = doc(db, "orders", orderId);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    setOrder(snap.data());
                }
                else {
                    setOrder(null);
                }
            }
            catch (err) {
                console.error("Failed to load order:", err);
                setError("Error loading order");
                setOrder(null);
            }
        }
        loadOrder();
    }, [orderId]);
    if (error)
        return _jsx("p", { children: error });
    if (!order)
        return _jsx("p", { children: "Loading..." });
    return (_jsxs("div", { className: "container mt-4", children: [_jsxs("h2", { children: ["Order #", orderId] }), _jsxs("p", { children: ["Date: ", order.createdAt.toDate().toLocaleString()] }), _jsxs("p", { children: ["Total: $", order.totalPrice.toFixed(2)] }), _jsx("h4", { children: "Items" }), _jsx("ul", { className: "list-group", children: order.items.map((item, index) => (_jsxs("li", { className: "list-group-item d-flex align-items-center justify-content-between", children: [_jsxs("div", { className: "d-flex align-items-center", children: [_jsx("img", { src: item.image, alt: item.title, width: 60, height: 60, style: { objectFit: "contain", marginRight: "12px" }, onError: (e) => {
                                        e.currentTarget.src = "assets/placeholder.jpg";
                                    } }), _jsxs("div", { children: [_jsx("strong", { children: item.title }), _jsx("br", {}), "Quantity: ", item.quantity] })] }), _jsxs("div", { className: "fw-bold", children: ["$", (item.price * item.quantity).toFixed(2)] })] }, index))) })] }));
}
