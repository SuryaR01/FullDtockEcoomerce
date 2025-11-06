import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaRegStar, FaEye, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import toast from "react-hot-toast";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const { favorites, toggleFavorite } = useFavorites();

  // ✅ Load logged-in user from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      }
    } catch (err) {
      console.error("❌ Error loading current user:", err);
    }
  }, []);

  // ✅ Fetch products from database
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/prd/products");
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else if (Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      } else {
        console.error("Invalid product data:", res.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const isFavorite = (id) => favorites.some((fav) => fav.productId?._id === id);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-cyan-600 text-xl font-semibold">
        Loading products...
      </div>
    );
  }

  return (
    <section className="py-16 px-6 md:px-20 bg-gray-50 min-h-screen">
      <div className="text-sm text-gray-500 mb-6">
        <Link to={"/"}> Home </Link>/{" "}
        <span className="text-cyan-600 font-medium">All Product</span>
      </div>
      {/* Header */}
      <div className="text-center mb-12">
        <h4 className="text-cyan-600 font-semibold uppercase tracking-widest mb-2">
          Our Collection
        </h4>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Explore All Products
        </h1>
        <p className="text-gray-500 mt-3 text-sm md:text-base max-w-2xl mx-auto">
          Browse through our handpicked collection of high-quality products. Add
          your favorites or shop directly!
        </p>

        {currentUser && (
          <p className="text-gray-600 mt-3">
            Logged in as:{" "}
            <span className="text-cyan-600 font-semibold">
              {currentUser.username || currentUser.userName} (
              {currentUser.email || currentUser.userEmail})
            </span>
          </p>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            {/* Wishlist & View Buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
              <button
                onClick={() => toggleFavorite(product)}
                className={`px-4 py-2 rounded transition ${
                  isFavorite(product._id)
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {isFavorite(product._id) ? "❤️ Remove" : "🤍 Add"}
              </button>

              <Link
                to={`/product/${product._id}`}
                className="bg-white p-2 rounded-full hover:bg-cyan-100 transition text-cyan-600 shadow"
              >
                <FaEye />
              </Link>
            </div>

            {/* Product Image */}
            <div className="flex justify-center items-center bg-gray-50 h-56">
              <img
                src={product.image}
                alt={product.name}
                className="w-60 h-50 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Details */}
            <div className="p-4 text-center">
              <h3 className="font-semibold text-gray-800 mb-1 truncate">
                {product.name}
              </h3>
              <p className="text-cyan-600 font-bold text-lg mb-1">
                ${product.price}
              </p>

              {/* ⭐ Rating */}
              <div className="flex justify-center mb-2">
                {Array(5)
                  .fill()
                  .map((_, i) =>
                    i < Math.round(product.rating || 0) ? (
                      <FaStar key={i} className="text-yellow-400" />
                    ) : (
                      <FaRegStar key={i} className="text-gray-300" />
                    )
                  )}
              </div>

              <p className="text-sm text-gray-500 mb-4">
                ({product.reviews || 0}) Reviews
              </p>

              {/* 🛒 Buttons */}
              <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                  <FaShoppingCart /> Add to Cart
                </button>

                <Link
                  to={`/product/${product._id}`}
                  className="border border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white px-4 py-2 rounded-lg transition"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
