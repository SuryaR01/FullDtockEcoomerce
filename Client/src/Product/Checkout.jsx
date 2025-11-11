



import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Checkout = () => {
  const { cart, updateCartItem, removeFromCart } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const singleProductData = JSON.parse(localStorage.getItem("checkoutProduct"));

    // ✅ If user clicked “Buy Now”
    if (location.state?.isSingleBuy && singleProductData) {
      const { product, quantity, total } = singleProductData;
      setCartItems([{ _id: product._id, product, quantity }]);
    } else {
      // ✅ Normal cart checkout
      setCartItems(
        cart.map((item) => ({
          ...item,
          quantity: item.product?.quantity || 1,
        }))
      );
    }
  }, [cart, location]);

  // Quantity control
  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );

  const handleConfirmOrder = () => {
    navigate("/payment", {
      state: {
        cartItems,
        subtotal,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-cyan-500">Home</Link> /{" "}
        <span className="text-cyan-500">Checkout</span>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Checkout Summary 🛒
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">No items to checkout!</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b pb-4">
              <img
                src={item.product?.image}
                alt={item.product?.name}
                className="w-24 h-24 rounded-md object-cover border"
              />
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-gray-800">{item.product?.name}</h3>
                <p className="text-sm text-gray-500">{item.product?.category}</p>
                <div className="flex items-center mt-3 gap-3">
                  <button
                    onClick={() => handleQuantityChange(item._id, -1)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-semibold"
                  >
                    −
                  </button>
                  <span className="text-gray-800 font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, +1)}
                    className="px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-700 text-lg font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-cyan-600 font-semibold text-lg">
                  ₹{(item.product?.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-gray-500 text-sm">₹{item.product?.price} each</p>
                {!location.state?.isSingleBuy && (
                  <button
                    onClick={() => removeFromCart?.(item._id)}
                    className="text-red-500 text-sm mt-1 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Subtotal */}
          <div className="flex justify-between items-center border-t pt-4 font-semibold text-lg">
            <span>Subtotal:</span>
            <span className="text-cyan-700">₹{subtotal.toFixed(2)}</span>
          </div>

          {/* Confirm */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleConfirmOrder}
              className="bg-cyan-600 text-white py-2 px-6 rounded-md hover:bg-cyan-700 transition-all"
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
