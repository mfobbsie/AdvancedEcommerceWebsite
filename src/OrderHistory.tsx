import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { useAuth } from "./useAuth";
import { Link } from "react-router-dom";

interface Order {
  id: string;
  userId: string;
  createdAt: Timestamp;
  totalPrice: number;
}

export default function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function loadOrders() {
      if (!user) return;

      const uid = user.uid;

      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", uid),
          orderBy("createdAt", "desc"),
        );

        const snap = await getDocs(q);
        const list = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Order, "id">),
        })) as Order[];

        setOrders(list);
      } catch (err) {
        console.error("Error loading orders:", err);
      }
    }

    loadOrders();
  }, [user]);

  return (
    <div className="container mt-4">
      <h2>Your Orders</h2>
      {orders.length === 0 && <p>No orders yet.</p>}
      <ul className="list-group">
        {orders.map((order) => (
          <li key={order.id} className="list-group-item">
            <Link to={`/orders/${order.id}`}>
              <strong>Order #{order.id}</strong>
              <br />
              Date: {order.createdAt.toDate().toLocaleString()}
              <br />
              Total: ${order.totalPrice.toFixed(2)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
