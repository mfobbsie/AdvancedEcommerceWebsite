import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebaseConfig";
import { doc, getDoc, type DocumentData } from "firebase/firestore";

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<DocumentData | null>(null);

  useEffect(() => {
    async function loadOrder() {
      if (!orderId) return;

      const ref = doc(db, "orders", orderId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setOrder(snap.data());
      }
    }

    loadOrder();
  }, [orderId]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Order #{orderId}</h2>

      <p>Date: {order.createdAt.toDate().toLocaleString()}</p>
      <p>Total: ${order.totalPrice.toFixed(2)}</p>

      <h4>Items</h4>
      <ul className="list-group">
        {order.items.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between"
          >
            <div>
              <strong>{item.title}</strong>
              <br />
              Quantity: {item.quantity}
            </div>
            <div>${(item.price * item.quantity).toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
