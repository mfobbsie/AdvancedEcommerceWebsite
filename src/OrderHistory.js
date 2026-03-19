import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { collection, query, where, getDocs, orderBy, } from "firebase/firestore";
import { useAuth } from "./useAuth";
import { Link } from "react-router-dom";
export default function OrderHistory() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        async function loadOrders() {
            if (!user)
                return;
            const uid = user.uid;
            try {
                const q = query(collection(db, "orders"), where("userId", "==", uid), orderBy("createdAt", "desc"));
                const snap = await getDocs(q);
                const list = snap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setOrders(list);
            }
            catch (err) {
                console.error("Error loading orders:", err);
            }
        }
        loadOrders();
    }, [user]);
    return (_jsxs("div", { className: "container mt-4", children: [_jsx("h2", { children: "Your Orders" }), orders.length === 0 && _jsx("p", { children: "No orders yet." }), _jsx("ul", { className: "list-group", children: orders.map((order) => (_jsx("li", { className: "list-group-item", children: _jsxs(Link, { to: `/orders/${order.id}`, children: [_jsxs("strong", { children: ["Order #", order.id] }), _jsx("br", {}), "Date: ", order.createdAt.toDate().toLocaleString(), _jsx("br", {}), "Total: $", order.totalPrice.toFixed(2)] }) }, order.id))) })] }));
}
