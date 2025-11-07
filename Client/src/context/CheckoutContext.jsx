
import { createContext, useContext, useState } from "react";

const MoveCartContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [moveToCart, setMoveToCart] = useState([]);

  const addToCart = (product) => {
    setMoveToCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, qty) => {
    setMoveToCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setMoveToCart((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => setMoveToCart([]);

  const Subtotal = moveToCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <MoveCartContext.Provider
      value={{ moveToCart, addToCart, updateQuantity, removeFromCart, clearCart, Subtotal }}
    >
      {children}
    </MoveCartContext.Provider>
  );
};

export const useCart = () => useContext(MoveCartContext);
