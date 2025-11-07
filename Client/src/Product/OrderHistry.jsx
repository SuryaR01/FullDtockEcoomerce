// import React, { useEffect, useState, useRef } from "react";
// import { Button } from "@/components/ui/button"; // if you’re using shadcn/ui
// import { useReactToPrint } from "react-to-print";

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const printRef = useRef();

//   // 🔹 Fetch user orders (mock or from API)
//   useEffect(() => {
//     // Replace this with your actual API call or DB fetch
//     const storedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
//     setOrders(storedOrders);
//   }, []);

//   // 🔹 React to Print setup
//   const handlePrint = useReactToPrint({
//     content: () => printRef.current,
//     documentTitle: "Order_History",
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-gray-800">Order History</h1>
//         <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
//           Print / Download
//         </Button>
//       </div>

//       <div ref={printRef} className="bg-white p-6 rounded-lg shadow-md">
//         {orders.length === 0 ? (
//           <p className="text-gray-600 text-center">No orders found.</p>
//         ) : (
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-200 text-left">
//                 <th className="p-3 border">Order ID</th>
//                 <th className="p-3 border">Date</th>
//                 <th className="p-3 border">Products</th>
//                 <th className="p-3 border">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order, idx) => (
//                 <tr key={idx} className="hover:bg-gray-50">
//                   <td className="p-3 border">{order.orderId}</td>
//                   <td className="p-3 border">{order.date}</td>
//                   <td className="p-3 border">
//                     {order.products.map((p, i) => (
//                       <div key={i}>
//                         {p.name} × {p.qty} — ₹{p.price}
//                       </div>
//                     ))}
//                   </td>
//                   <td className="p-3 border font-medium text-gray-800">
//                     ₹{order.total}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderHistory;



import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const printRef = useRef();

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || user?.userName || user?.userEmail;

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem(`orders_${username}`)) || [];
    setOrders(storedOrders);
  }, [username]);
 console.log(orders , "print")
  const handleDelete = (orderId) => {
    const updated = orders.filter((order) => order.orderId !== orderId);
    setOrders(updated);
    localStorage.setItem(`orders_${username}`, JSON.stringify(updated));
    toast.success("Order deleted!");
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.orders,
    documentTitle: "Order_History",
  });
 

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
        <Link to="/allproduct" className="text-cyan-500 font-bold">
          Order History
        </Link>{" "}
      </div>

      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Your Order History</h1>
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Print Orders
        </button>
      </div>

      <div ref={printRef} className="bg-white p-6 rounded-lg shadow-md">
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
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId} className="hover:bg-gray-50">
                  <td className="p-3 border">{order.orderId}</td>
                  <td className="p-3 border">{order.orderDate}</td>
                  <td className="p-3 border">
                    {order.items.map((i, index) => (
                      <div key={index}>
                        {i.product?.name} × {i.product?.quantity || 1}
                      </div>
                    ))}
                  </td>
                  <td className="p-3 border font-semibold">₹{order.total}</td>
                  <td className="p-3 border">
                    <button
                      onClick={() => handleDelete(order.orderId)}
                      className="text-red-600 hover:underline"
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
