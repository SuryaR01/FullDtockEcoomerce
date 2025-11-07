



import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PayMent = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || user?.userName || user?.userEmail;

  const [billing, setBilling] = useState({
    firstName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    phone: "",
    email: "",
    saveInfo: true,
  });

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * (item.product?.quantity || 1),
    0
  );
  const shipping = 50;
  const taxPercent = 5;
  const taxAmount = (subtotal * taxPercent) / 100;
  const total = subtotal + shipping + taxAmount;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBilling({ ...billing, [name]: type === "checkbox" ? checked : value });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (!billing.firstName || !billing.address || !billing.phone || !billing.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: "rzp_test_2ORD27rb7vGhwj",
      amount: Math.round(total * 100),
      currency: "INR",
      name: "DressShop",
      description: "Order Payment",
      handler: function (response) {
        toast.success("Payment Successful!");
         setCart([]);
        localStorage.removeItem("cart");
        navigate("/orderhistory");

        const newOrder = {
          orderId: "ODR" + Date.now(),
          orderDate: new Date().toLocaleString(),
          billingDetails: billing,
          items: cart,
          subtotal,
          shipping,
          taxAmount,
          total,
          paymentId: response.razorpay_payment_id,
          paymentStatus: "Paid",
          paymentMethod: "Online",
        };

        // ✅ Save to localStorage per user
        const existingOrders =
          JSON.parse(localStorage.getItem(`orders_${username}`)) || [];
        localStorage.setItem(
          `orders_${username}`,
          JSON.stringify([newOrder, ...existingOrders])
        );

        if (billing.saveInfo) {
          localStorage.setItem("billingInfo", JSON.stringify(billing));
        }
      },
      prefill: {
        name: billing.firstName,
        email: billing.email,
        contact: billing.phone,
      },
      notes: {
        address: `${billing.address}, ${billing.city}`,
      },
      theme: {
        color: "#06b6d4",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
      {/* Left: Billing Details */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Billing Details
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              First Name*
            </label>
            <input
              name="firstName"
              value={billing.firstName}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-cyan-600 outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Street Address*
            </label>
            <input
              name="address"
              value={billing.address}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-cyan-600 outline-none"
              placeholder="Street, building, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              City*
            </label>
            <input
              name="city"
              value={billing.city}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-cyan-600 outline-none"
              placeholder="City name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Phone*
            </label>
            <input
              name="phone"
              value={billing.phone}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-cyan-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email*
            </label>
            <input
              name="email"
              value={billing.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-cyan-600 outline-none"
            />
          </div>
        </form>
      </div>

      {/* Right: Summary */}
      <div className="border p-6 rounded-lg shadow-sm bg-gray-50">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Your Order</h3>

        {cart.map((item) => (
          <div key={item._id} className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <img
                src={item.product?.image}
                alt={item.product?.name}
                className="w-14 h-14 rounded-md object-cover"
              />
              <span className="text-gray-700">{item.product?.name}</span>
            </div>
            <span className="font-medium text-gray-800">
              ₹{item.product?.price}
            </span>
          </div>
        ))}

        <hr className="my-4" />

        <div className="flex justify-between text-gray-700 mb-2">
          <span>Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-700 mb-2">
          <span>Shipping:</span>
          <span>₹{shipping}</span>
        </div>

        <div className="flex justify-between text-gray-700 mb-2">
          <span>Tax ({taxPercent}%):</span>
          <span>₹{taxAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-semibold text-lg text-gray-900 border-t pt-2">
          <span>Total:</span>
          <span>₹{total.toFixed(2)}</span>
        </div>

        <button
          onClick={handlePayment}
          className="w-full mt-6 bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700 transition-all"
        >
          Pay with Razorpay
        </button>
      </div>
    </div>
  );
};

export default PayMent;
