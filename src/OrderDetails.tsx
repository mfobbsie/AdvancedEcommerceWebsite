import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebaseConfig";
import { doc, getDoc, type Timestamp } from "firebase/firestore";

type OrderItem = {
  title: string;
  price: number;
  quantity: number;
  image: string;
};

type OrderData = {
  createdAt: Timestamp;
  totalPrice: number;
  items: OrderItem[];
};

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrder() {
      if (!orderId) return;
      try {
        const ref = doc(db, "orders", orderId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setOrder(snap.data() as OrderData);
        } else {
          setOrder(null);
        }
      } catch (err) {
        console.error("Failed to load order:", err);
        setError("Error loading order");
        setOrder(null);
      }
    }
    loadOrder();
  }, [orderId]);

  if (error) return <p>{error}</p>;
  if (!order) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Order #{orderId}</h2>
      <p>Date: {order.createdAt.toDate().toLocaleString()}</p>
      <p>Total: ${order.totalPrice.toFixed(2)}</p>
      <h4>Items</h4>
      <ul className="list-group">
        {order.items.map((item: OrderItem, index: number) => (
          <li
            key={index}
            className="list-group-item d-flex align-items-center justify-content-between"
          >
            <div className="d-flex align-items-center">
              <img
                src={item.image}
                alt={item.title}
                width={60}
                height={60}
                style={{ objectFit: "contain", marginRight: "12px" }}
                onError={(e) => {
                  e.currentTarget.src = "assets/placeholder.jpg";
                }}
              />
              <div>
                <strong>{item.title}</strong>
                <br />
                Quantity: {item.quantity}
              </div>
            </div>
            <div className="fw-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
