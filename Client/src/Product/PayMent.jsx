
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import emailjs from "emailjs-com"; // ✉️ Import EmailJS

const PayMent = () => {
  const { setCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems = [], subtotal: checkoutSubtotal = 0 } = location.state || {};
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const cart = cartItems.length > 0 ? cartItems : storedCart;

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || user?.userName || user?.userEmail;

  const [billing, setBilling] = useState({
    firstName: "",
    address: "",
    city: "",
    phone: "",
    email: "",
  });

  const subtotal =
    cart.reduce(
      (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 1),
      0
    ) || checkoutSubtotal;

  const shipping = 50;
  const taxPercent = 5;
  const taxAmount = (subtotal * taxPercent) / 100;
  const total = subtotal + shipping + taxAmount;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBilling({ ...billing, [name]: value });
  };

  // ✉️ Send Email using EmailJS
  const sendOrderEmail = (order) => {
    const orderItemsList = order.items
      .map(
        (item) =>
          `${item.product?.name} × ${item.quantity} = ₹${
            (item.product?.price || 0) * (item.quantity || 1)
          }`
      )
      .join("\n");

    const emailData = {
      user_name: order.billingDetails.firstName,
      user_email: order.billingDetails.email,
      order_id: order.orderId,
      order_total: order.total,
      order_date: order.orderDate,
      order_items: orderItemsList,
    };

    emailjs.send(
        "service_nbz7cic", 
        "template_s0hcgmw", 
        emailData,
        "44a9ao4p2AvUQAzSW" 
      )
      .then(() => {
        toast.success("📧 Order confirmation email sent!");
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        toast.error("Failed to send confirmation email.");
      });
  };

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

        const existingOrders =
          JSON.parse(localStorage.getItem(`orders_${username}`)) || [];
        localStorage.setItem(
          `orders_${username}`,
          JSON.stringify([newOrder, ...existingOrders])
        );

        sendOrderEmail(newOrder); // ✉️ send email here
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
      {/* Left: Billing Form */}
      <div>
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-cyan-500">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/checkout" className="hover:text-cyan-500">
            Checkout
          </Link>{" "}
          / <span className="text-cyan-500">Payment</span>
        </div>

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Billing Details
        </h2>

        <form className="space-y-4">
          <input
            name="firstName"
            value={billing.firstName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-cyan-600 outline-none"
          />
          <input
            name="address"
            value={billing.address}
            onChange={handleChange}
            placeholder="Street Address"
            className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-cyan-600 outline-none"
          />
          <input
            name="city"
            value={billing.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-cyan-600 outline-none"
          />
          <input
            name="phone"
            value={billing.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-cyan-600 outline-none"
          />
          <input
            name="email"
            value={billing.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-cyan-600 outline-none"
          />
        </form>
      </div>

      {/* Right: Order Summary */}
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
              <span className="text-gray-700">
                {item.product?.name} × {item.quantity || 1}
              </span>
            </div>
            <span className="font-medium text-gray-800">
              ₹{((item.product?.price || 0) * (item.quantity || 1)).toFixed(2)}
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
