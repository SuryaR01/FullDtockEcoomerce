// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { PlusCircle, X } from "lucide-react";
// import axios from "axios";
// import toast from "react-hot-toast"; // optional if you're using react-hot-toast
// import { useNavigate } from "react-router-dom";

// const AdProduct = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     price: "",
//     stock: "",
//     image: "",
//   });

//   const navigate = useNavigate();

//   const toggleForm = () => setShowForm(!showForm);

//   // ✅ Universal input handler
//   const inputHandler = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   // ✅ Submit Handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { name, description, price, stock, image } = product;

//     if (!name || !description || !price || !stock || !image) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:8000/prd/product", product);
//       toast.success("✅ Product added successfully!");
//       console.log("Product submitted:", product);

//       // Reset form
//       setProduct({ name: "", description: "", price: "", stock: "", image: "" });
//       setShowForm(false);
//       navigate("/admin/products");
//     } catch (error) {
//       console.error("Error adding product:", error);
//       toast.error("❌ Error adding product!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Products</h1>
//         <button
//           onClick={toggleForm}
//           className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-200"
//         >
//           <PlusCircle className="w-5 h-5" /> Add Product
//         </button>
//       </div>

//       {/* Product Table Placeholder */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <p className="text-gray-500 text-center py-20">
//           No products added yet. Click{" "}
//           <span className="font-semibold">“Add Product”</span> to create one.
//         </p>
//       </div>

//       {/* Animated Add Product Form */}
//       <AnimatePresence>
//         {showForm && (
//           <motion.div
//             className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0, y: 40 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.8, opacity: 0, y: 40 }}
//               transition={{ type: "spring", stiffness: 200, damping: 20 }}
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative"
//             >
//               {/* Close Button */}
//               <button
//                 onClick={toggleForm}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
//               >
//                 <X className="w-6 h-6" />
//               </button>

//               <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
//                 Add New Product
//               </h2>

//               <form className="space-y-4" onSubmit={handleSubmit}>
//                 {/* Product Name */}
//                 <div>
//                   <label className="block text-gray-700 font-medium mb-1">
//                     Product Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={product.name}
//                     onChange={inputHandler}
//                     placeholder="Enter product name"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                   />
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="block text-gray-700 font-medium mb-1">
//                     Description
//                   </label>
//                   <textarea
//                     name="description"
//                     value={product.description}
//                     onChange={inputHandler}
//                     placeholder="Enter product description"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
//                     rows={3}
//                   ></textarea>
//                 </div>

//                 {/* Price and Stock */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-gray-700 font-medium mb-1">
//                       Price ($)
//                     </label>
//                     <input
//                       type="number"
//                       name="price"
//                       value={product.price}
//                       onChange={inputHandler}
//                       placeholder="0.00"
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-gray-700 font-medium mb-1">
//                       Stock
//                     </label>
//                     <input
//                       type="number"
//                       name="stock"
//                       value={product.stock}
//                       onChange={inputHandler}
//                       placeholder="Enter stock quantity"
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                     />
//                   </div>
//                 </div>

//                 {/* Image URL */}
//                 <div>
//                   <label className="block text-gray-700 font-medium mb-1">
//                     Image URL
//                   </label>
//                   <input
//                     type="text"
//                     name="image"
//                     value={product.image}
//                     onChange={inputHandler}
//                     placeholder="Paste product image URL"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition font-semibold shadow"
//                 >
//                   Save Product
//                 </button>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AdProduct;



import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const AdProduct = () => {
  const [showForm, setShowForm] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const toggleForm = () => setShowForm(!showForm);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, stock, image } = product;
    if (!name || !description || !price || !stock || !image) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/prd/product", product);
      toast.success("Product added successfully!");
      console.log("✅ Server Response:", res.data);
      setProduct({ name: "", description: "", price: "", stock: "", image: "" });
      setShowForm(false);
    } catch (error) {
      console.error("❌ Error adding product:", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <button
          onClick={toggleForm}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-200"
        >
          <PlusCircle className="w-5 h-5" /> Add Product
        </button>
      </div>

      {/* Product Table Placeholder */}
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500 text-center py-20">
          No products added yet. Click <span className="font-semibold">“Add Product”</span> to create one.
        </p>
      </div>

      {/* Animated Add Product Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative"
            >
              {/* Close Button */}
              <button
                onClick={toggleForm}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
                Add New Product
              </h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {["name", "description", "price", "stock", "image"].map((field) => (
                  <div key={field}>
                    <label className="block text-gray-700 font-medium mb-1 capitalize">
                      {field}
                    </label>
                    <input
                      type={field === "price" || field === "stock" ? "number" : "text"}
                      name={field}
                      value={product[field]}
                      onChange={inputHandler}
                      placeholder={`Enter ${field}`}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition font-semibold shadow"
                >
                  Save Product
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdProduct;
