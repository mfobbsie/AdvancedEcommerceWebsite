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

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    if (!user) {
      setSuccessMessage("You must be logged in to checkout.");
      return;
    }

    try {
      const orderId = await createOrder(user.uid, cartItems);

      clearCart();

      setSuccessMessage(
        `Checkout successful! You purchased ${totalItems} items for $${totalPrice.toFixed(
          2,
        )}.`,
      );

      setTimeout(() => {
        navigate(`/orders/${orderId}`);
      }, 1500);
    } catch (error) {
      console.error("Checkout error.", error);
      setSuccessMessage("Something went wrong during checkout.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {successMessage && (
        <div className="alert alert-success fade show" role="alert">
          {successMessage}
        </div>
      )}

      {cartItems.length === 0 && <p>Your cart is empty.</p>}

      <ul className="list-group">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex align-items-center"
          >
            <img
              src={item.image}
              width={50}
              className="me-3"
              onError={(e) => {
                e.currentTarget.src = "assets/placeholder.jpg";
              }}
            />
            <div className="flex-grow-1">
              <strong>{item.title}</strong>
              <div>
                ${item.price.toFixed(2)} × {item.quantity}
              </div>
            </div>

            <button
              className="btn-brand-grey"
              style={{ borderRadius: "12px" }}
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {cartItems.length > 0 && (
        <>
          <h4 className="mt-3">
            Total Items: {totalItems} — Total Price: ${totalPrice.toFixed(2)}
          </h4>
          <button
            className="btn-brand-yellow mt-2"
            style={{ borderRadius: "12px" }}
            onClick={clearCart}
          >
            Clear Cart
          </button>
          <button
            className="btn-brand-green mt-2 ms-2"
            style={{ borderRadius: "12px" }}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
