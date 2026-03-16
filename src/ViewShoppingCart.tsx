import { useCart } from "./CartContext";
import { useState } from "react";

export default function ViewShoppingCart() {
  const { cartItems, removeFromCart, clearCart } = useCart();

const [successMessage, setSuccessMessage] = useState("");

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setSuccessMessage(
      `Checkout successful! You purchased ${totalItems} items for $${totalPrice.toFixed(2)}.`,
    );

    // Fade out after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    clearCart();
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
            <img src={item.image} width={50} className="me-3" />
            <div className="flex-grow-1">
              <strong>{item.title}</strong>
              <div>
                ${item.price.toFixed(2)} × {item.quantity}
              </div>
            </div>

            <button
              className="btn btn-danger btn-sm"
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
          <button className="btn btn-warning mt-2" onClick={clearCart}>
            Clear Cart
          </button>
          <button
            className="btn btn-success mt-2 ms-2"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
