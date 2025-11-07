import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { cart } = useCart();

  // Calculate subtotal
  const subtotal = cart.reduce((acc, item) => {
    const price = item.product?.price || 0;
    const qty = item.product?.quantity || 1;
    return acc + price * qty;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-cyan-500">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/allproduct" className="hover:text-cyan-500">
          All Products
        </Link>{" "}
        /{" "}
        <Link to="/allproduct" className="text-cyan-500">
          Check Out
        </Link>{" "}
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Checkout Summary 🛒
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">No items in your cart!</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 border-b pb-4"
            >
              <img
                src={item.product?.image}
                alt={item.product?.name}
                className="w-20 h-20 rounded-md object-cover border"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.product?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.product?.category}
                </p>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {item.product?.description}
                </p>
                <div className="mt-2 text-gray-700">
                  Qty:{" "}
                  <span className="font-medium">
                    {item.product?.quantity || 1}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-cyan-600 font-semibold">
                  ₹{item.product?.price}
                </p>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center border-t pt-4 font-semibold text-lg">
            <span>Subtotal:</span>
            <span className="text-cyan-700">₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-end mt-6">
            <Link
              to={"/payment"}
              className="bg-cyan-600 text-white py-2 px-6 rounded-md hover:bg-cyan-700 transition-all"
            >
              Confirm Order
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
