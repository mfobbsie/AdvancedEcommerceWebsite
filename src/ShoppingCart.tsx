import React, { useState } from "react";

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<
    {
      id: number;
      title: string;
      image: string;
      price: number;
      quantity: number;
    }[]
  >([]);

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => setCartItems([]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleCheckout = () => {
    alert(
      `Checking out ${totalItems} items for a total of $${totalPrice.toFixed(
        2,
      )}`,
    );
    clearCart();
  };

  return (
    <div>
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 && <p>Your cart is empty.</p>}

      <ul>
        {cartItems.map((item) => (
          <li key={item.id} style={{ marginBottom: "1rem" }}>
            <img
              src={item.image}
              alt={item.title}
              width={50}
              style={{ marginRight: "10px" }}
            />
            <strong>{item.title}</strong> — ${item.price.toFixed(2)} ×{" "}
            {item.quantity}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {cartItems.length > 0 && (
        <>
          <p>
            <strong>Total:</strong> ${totalPrice.toFixed(2)}
          </p>
          <button onClick={handleCheckout}>Checkout</button>
          <button onClick={clearCart} style={{ marginLeft: "10px" }}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
