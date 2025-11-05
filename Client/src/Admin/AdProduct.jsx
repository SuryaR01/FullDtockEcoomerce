import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, X } from "lucide-react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdAddToPhotos } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from "ag-grid-community";
import { useRef } from "react";
import { useMemo } from "react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

const myTheme = themeQuartz.withParams({
  spacing: 5,
  foregroundColor: "rgb(12, 140, 116)",
  headerBackgroundColor: "rgb(99, 239, 227)",
  backgroundColor: "rgb(211, 246, 239)",
  rowHoverColor: "lightblue",
  textColor: "black",
  fontSize: 16,
});

const AdProduct = () => {
  ModuleRegistry.registerModules([AllCommunityModule]);
  const gridRef = useRef();
  const [products, setProducts] = useState([]);

  // 🧠 Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/prd/products");
      if (Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🧩 Column Definitions
  const columnDefs = useMemo(
    () => [
      {
        headerName: "Image",
        field: "image",
        cellRenderer: (params) => (
          <img
            src={params.value}
            alt="Product"
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        ),
        width: 100,
      },
      { headerName: "Name", field: "name", filter: true, flex: 1 },
      {
        headerName: "Price",
        field: "price",
        valueFormatter: (p) => `₹${p.value}`,
        filter: "agNumberColumnFilter",
      },
      { headerName: "Category", field: "category", filter: true },
      {
        headerName: "Stock",
        field: "stock",
        cellStyle: (p) => ({
          color: p.value < 10 ? "red" : "green",
          fontWeight: "bold",
        }),
      },
      { headerName: "Description", field: "description", flex: 2 },
      {
        headerName: "Action",
        field: "actions",
        cellRenderer: (params) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEditClick(params.data)}
              className="border p-2 rounded-sm text-cyan-500 hover:bg-green-50"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(params.data._id)}
              className="border p-2 rounded-sm text-red-500 hover:bg-red-50"
            >
              <MdDelete />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    }),
    []
  );

  // const handleEditClick = (prd) => {
  //   console.log("📝 Edit clicked:", prd);
  //   // You can open a modal or navigate to edit page here
  // };

  // const handleDelete = (id) => {
  //   console.log("🗑 Delete clicked:", id);
  //   // Implement delete API here
  // };

  // SHOW ALL PRODUCTS FROM DATA BASE IN TABLE FUNCTIONS
  // const [products, setProducts] = useState([]);
  // const fetchProducts = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:8000/prd/products");
  //     if (Array.isArray(res.data.products)) {
  //       setProducts(res.data.products);
  //     } else {
  //       setProducts([]);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error fetching products:", error);
  //     setProducts([]);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // FORM SUBMIT ADD PROFUCT SECTION METHODS/////

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    stock: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("📦 Sending product data:", product);

    try {
      const res = await axios.post("http://localhost:8000/prd/product", {
        name: product.name,
        price: Number(product.price),
        category: product.category,
        description: product.description,
        image: product.image,
        stock: Number(product.stock),
      });

      toast.success(res.data.message);
      setProduct({
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
        stock: "",
      });
      Navigate("/admin/products");
    } catch (error) {
      console.error("❌ Error adding product:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };

  console.log(products);
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);

  // ========================================================

  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: "",
  });

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      description: product.description,
      image: product.image,
    });
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit edited data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/prd/updateproduct/${editingProduct._id}`,
        formData
      );
      alert("Product updated successfully!");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product.");
    }
  };

  //---------------delete method-------------------//

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(`http://localhost:8000/prd/deleteproduct/${id}`);
      toast.success("Product deleted successfully ✅");

      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🛍️ Product List</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className=" flex justify-center items-center gap-2 bg-cyan-400 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg shadow-lg transition-all"
        >
          <MdAddToPhotos size={20} /> {showForm ? "Close Form" : " Add Product"}
        </button>
      </div>

      {!showForm ? (
        products.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-center py-20">
              No products added yet. Click{" "}
              <span className="font-semibold">“Add Product”</span> to create
              one.
            </p>
          </div>
        ) : (
          <div>
            <div
              className="ag-theme-quartz m-10 rounded-2xl shadow-lg"
              style={{ height: "600px", width: "93%" }}
              theme={myTheme}
            >
              <AgGridReact
                ref={gridRef}
                rowData={products}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowSelection="multiple"
                animateRows={true}
                pagination={true}
                paginationPageSize={20}
                enableRangeSelection={true}
              />
            </div>

            {/* ✅ Edit Form Modal */}
            {editingProduct && (
              <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-130">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5 bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200"
                  >
                    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                      ✏️ Update Product Details
                    </h2>

                    {/* Product Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Categorys
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                      >
                        <option value="">Select Category</option>
                        <option value="Phones">📱 Phones</option>
                        <option value="Computers">💻 Computers</option>
                        <option value="SmartWatch">⌚ SmartWatch</option>
                        <option value="Camera">📷 Camera</option>
                        <option value="HeadPhones">🎧 HeadPhones</option>
                        <option value="Gaming">🎮 Gaming</option>
                      </select>
                    </div>

                    {/* Stock */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder="Enter stock quantity"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Write a short description..."
                        rows="3"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                      />
                    </div>

                    {/* Image */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Paste image link"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center mt-6">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition font-medium"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 shadow-md transition font-semibold"
                      >
                        <GrDocumentUpdate className="text-lg" />
                        Update Product
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )
      ) : (
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
                className="bg-white rounded-2xl shadow-2xl w-full max-w-[700px] h-[750px] p-6 relative"
              >
                {/* Close Button */}
                <button
                  onClick={toggleForm}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
                >
                  <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
                  🛍️ Add New Product
                </h2>

                <div className=" p-5 flex items-center justify-center">
                  <form
                    onSubmit={submitForm}
                    className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-5 transition-all hover:shadow-3xl"
                  >
                    {/* <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                       Add New Product
                    </h2> */}

                    <div className="grid md:grid-cols-2 gap-5 mt-5">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Product Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={product.name}
                          onChange={inputHandler}
                          placeholder="Enter product name"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Price (₹)
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={product.price}
                          onChange={inputHandler}
                          placeholder="Enter price"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
                        />
                      </div>

                      {/* <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Category
                        </label>
                        <input
                          type="text"
                          name="category"
                          value={product.category}
                          onChange={inputHandler}
                          placeholder="Enter category"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
                        />
                      </div> */}

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Category
                        </label>
                        <select
                          name="category"
                          value={product.category}
                          onChange={inputHandler}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                        >
                          <option value="">Select Category</option>
                          <option value="Phones">📱 Phones</option>
                          <option value="Computers">💻 Computers</option>
                          <option value="SmartWatch">⌚ SmartWatch</option>
                          <option value="Camera">📷 Camera</option>
                          <option value="HeadPhones">🎧 HeadPhones</option>
                          <option value="Gaming">🎮 Gaming</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Stock Quantity
                        </label>
                        <input
                          type="number"
                          name="stock"
                          value={product.stock}
                          onChange={inputHandler}
                          placeholder="Enter stock count"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Image URL
                      </label>
                      <input
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={inputHandler}
                        placeholder="Enter image URL"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
                      />
                    </div>

                    <div className="mt-6">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={product.description}
                        onChange={inputHandler}
                        placeholder="Enter product description"
                        rows="4"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className=" flex justify-center items-center gap-2 w-full mt-8 bg-gradient-to-r from-cyan-400 to-indigo-600 hover:from-indigo-600 hover:to-cyan-400 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105"
                    >
                      <MdAddToPhotos size={20} /> Add Product
                    </button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default AdProduct;
