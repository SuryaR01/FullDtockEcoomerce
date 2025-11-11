

import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const printRefs = useRef({});
  const allOrdersRef = useRef();

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || user?.userName || user?.userEmail;

  useEffect(() => {
    const storedOrders =
      JSON.parse(localStorage.getItem(`orders_${username}`)) || [];
    setOrders(storedOrders);
  }, [username]);

  const handleDelete = (orderId) => {
    const updated = orders.filter((order) => order.orderId !== orderId);
    setOrders(updated);
    localStorage.setItem(`orders_${username}`, JSON.stringify(updated));
    toast.success("Order deleted!");
  };

  // ✅ Print all orders
  const handlePrintAll = () => {
    const printContent = allOrdersRef.current?.innerHTML;
    if (!printContent) return;

    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Super Market - Order History</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
            .print-container { border: 1px solid #ccc; padding: 20px; max-width: 900px; margin: auto; }
            h2, h3 { color: #256029; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            footer { margin-top: 40px; text-align: center; font-size: 12px; border-top: 1px solid #ccc; padding-top: 10px; }
            @media print {
              .no-print { display: none !important; } /* ✅ hide buttons in print */
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <h2>Super Market - All Orders</h2>
            ${printContent}
          </div>
          <footer><p>Printed on: ${new Date().toLocaleString()}</p></footer>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  // ✅ Print a single order
const handlePrintOne = (orderId) => {
  const printContent = printRefs.current[orderId]?.innerHTML;
  if (!printContent) return;

  const printWindow = window.open("", "", "width=800,height=600");
  printWindow.document.write(`
    <html>
      <head>
        <title>Super Market - Order #${orderId}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
          .print-container { border: 1px solid #ccc; padding: 20px; max-width: 800px; margin: auto; }
          h2, h3 { color: #256029; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          footer { margin-top: 40px; text-align: center; font-size: 12px; border-top: 1px solid #ccc; padding-top: 10px; }

          /* ✅ Hide Delete + Print buttons */
          @media print {
              .no-print { display: none !important; } /* ✅ hide buttons in print */
            }
        </style>
      </head>
      <body>
        <div class="print-container">
          <h2>Super Market</h2>
          <h3>Order ID: ${orderId}</h3>
          ${printContent}
        </div>
        <footer><p>Printed on: ${new Date().toLocaleString()}</p></footer>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  printWindow.onload = () => {
    printWindow.print();
    printWindow.close();
  };
};


  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="text-md text-gray-500 mb-6">
        <Link to="/" className="hover:text-cyan-500">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/allproduct" className="hover:text-cyan-500">
          All Products
        </Link>{" "}
        /{" "}
        <span className="text-cyan-500 font-bold">Order History</span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Your Order History
        </h1>
        <button
          onClick={handlePrintAll}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 no-print"
        >
          Print All Orders
        </button>
      </div>

      <div ref={allOrdersRef} className="bg-white p-6 rounded-lg shadow-md">
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders placed yet.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Items</th>
                <th className="p-3 border">Total</th>
                <th className="p-3 border no-print">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.orderId}
                  ref={(el) => (printRefs.current[order.orderId] = el)}
                  className="hover:bg-gray-50"
                >
                  <td className="p-3 border font-semibold">{order.orderId}</td>
                  <td className="p-3 border">{order.orderDate}</td>
                  <td className="p-3 border">
                    {order.items.map((i, index) => (
                      <div key={index}>
                        {i.product?.name} × {i.product?.quantity || 1}
                      </div>
                    ))}
                  </td>
                  <td className="p-3 border font-semibold">₹{order.total}</td>
                  <td className="p-3 border flex flex-col gap-2 no-print">
                    <button
                      onClick={() => handlePrintOne(order.orderId)}
                      className="text-blue-600 hover:bg-gray-200 rounded-sm border uppercase font-serif"
                    >
                      Print
                    </button>
                    <button
                      onClick={() => handleDelete(order.orderId)}
                      className="text-red-600 hover:bg-gray-200 rounded-sm border uppercase font-serif"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
