import React, { useEffect, useState } from "react";
import {
  FaHeart,
  FaStar,
  FaRegStar,
  FaEye,
  FaShoppingCart,
} from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

const ExploreProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { favorites, toggleFavorite } = useFavorites();
  const { toggleCart } = useCart();

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
          Discover our hand-picked collection of top-quality products loved by
          our customers.
        </p>
      </div>

      <div className="flex justify-end  m-12">
        <Link
          to="/allproduct"
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-sm font-semibold transition-all duration-300 shadow-md"
        >
          View All Products
        </Link>
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
              <button
                onClick={() => toggleFavorite(product)}
                className="opacity-0 group-hover:opacity-100 bg-white p-2 rounded-full hover:bg-cyan-100 transition-all duration-300"
              >
                <FaHeart className="text-cyan-600 text-lg" />
              </button>
              <Link
                to={`/product/${product._id}`}
                className="bg-white p-2 rounded-full hover:bg-cyan-100 transition-all duration-300 opacity-0 group-hover:opacity-100 "
              >
                <FaEye className="text-cyan-600 text-lg" />
              </Link>
            </div>

            {/* Product Image */}
            <div className="flex justify-center items-center p-6 bg-gray-100 h-56">
              <img
                src={product.image}
                alt={product.name}
                className="w-50 h-50 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Details */}
            <div className="p-4 text-start">
              <h3 className="font-bold uppercase text-gray-800 mb-2 truncate">
                {product.name}
              </h3>
              {/* <p className="font-bold mb-1"> PRICE : $ {product.price}</p> */}

               <div className="flex justify-start items-center gap-2 mb-2">
                <p className=" font-bold text-md"> PRICE :  <span className="text-gray-600"> $ {product.price}</span></p>
                <p className="text-gray-400 line-through text-sm font-bold">
                  ${(product.price * 1.2).toFixed(0)}
                </p>
              </div>

              {/* Star Rating */}
              <div className="flex justify-start mb-2">
                {Array(5)
                  .fill()
                  .map((_, i) =>
                    i < Math.round(product.rating || 4) ? (
                      <FaStar key={i} className="text-yellow-400" />
                    ) : (
                      <FaRegStar key={i} className="text-gray-300" />
                    )
                  )}
              </div>

              <p
                className={`text-sm mb-4 font-bold ${
                  product.stock > 10 ? "text-green-600" : "text-red-600"
                }`}
              >
                ( {product.stock} ) Stock
              </p>

              {/* Add to Cart Button (Hover Show) */}
              <button
                onClick={() => toggleCart(product)}
                className=" bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-md w-full flex items-center justify-center gap-2 transition-all duration-300"
              >
                <FaShoppingCart /> Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default ExploreProduct;
