
import React, { useEffect, useState } from "react";
import { FaHeart, FaStar, FaRegStar, FaEye, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

const ExploreProduct = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/prd/products");

        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          console.error("API response is not an array:", res.data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-cyan-600 text-xl font-semibold">
        Loading Products...
      </div>
    );
  }

  if (!Array.isArray(products)) {
    return (
      <div className="text-center text-red-600 mt-10 font-semibold">
        Invalid product data format.
      </div>
    );
  }

  // ✅ Show only first 8 products
  const limitedProducts = products.slice(0, 8);

  return (
    <section className="py-16 px-6 md:px-20 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <h4 className="text-cyan-600 font-semibold uppercase tracking-widest mb-2">
          Our Products
        </h4>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Explore Our Best Products
        </h1>
        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Discover our hand-picked collection of top-quality products loved by our customers.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {limitedProducts.map((product) => (
          <div
            key={product._id}
            className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            {/* Wishlist + View Icons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
              <button className="bg-white p-2 rounded-full hover:bg-cyan-100 transition">
                <FaHeart className="text-cyan-600 text-lg" />
              </button>
              <Link
                to={`/product/${product._id}`}
                className="bg-white p-2 rounded-full hover:bg-cyan-100 transition"
              >
                <FaEye className="text-cyan-600 text-lg" />
              </Link>
            </div>

            {/* Product Image */}
            <div className="flex justify-center items-center p-6 bg-gray-100 h-56">
              <img
                src={product.image}
                alt={product.name}
                className="w-40 h-40 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Details */}
            <div className="p-4 text-center">
              <h3 className="font-semibold text-gray-800 mb-2 truncate">
                {product.name}
              </h3>
              <p className="text-cyan-600 font-bold mb-1">${product.price}</p>

              {/* Star Rating */}
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

              {/* Add to Cart Button (Hover Show) */}
              <button className="opacity-0 group-hover:opacity-100 bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg w-full flex items-center justify-center gap-2 transition-all duration-300">
                <FaShoppingCart /> Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-12">
        <Link
          to="/allproduct"
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default ExploreProduct;
    


