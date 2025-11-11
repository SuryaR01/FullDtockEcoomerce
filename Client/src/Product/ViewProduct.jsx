import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar, FaHeart, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [related, setRelated] = useState([]);

  const { toggleFavorite } = useFavorites();
  const { toggleCart } = useCart();

  // ✅ Fetch main product + related products
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/prd/getproduct/${id}`);
      const data = res.data;
      setProduct(data);
      setTotalPrice(data.price);

      const allRes = await axios.get("http://localhost:8000/prd/products");
      const allData = allRes.data;

      const allProducts = Array.isArray(allData)
        ? allData
        : allData.products || [];

      const relatedProducts = allProducts
        .filter((p) => p.category === data.category && p._id !== data._id)
        .slice(0, 8);

      setRelated(relatedProducts);
    } catch (error) {
      console.error("❌ Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (product) setTotalPrice(product.price * quantity);
  }, [quantity, product]);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // ✅ Buy Now (single product checkout)
  const handleBuyNow = () => {
    const checkoutData = {
      product,
      quantity,
      total: totalPrice,
    };
    localStorage.setItem("checkoutProduct", JSON.stringify(checkoutData));
    navigate("/checkout", { state: { isSingleBuy: true } });
  };

  if (!product)
    return <div className="text-center py-20 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-16">
      {/* 🧭 Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-red-500">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/allproduct" className="hover:text-red-500">
          All Products
        </Link>{" "}
        /{" "}
        <span className="hover:text-red-500 cursor-pointer">
          {product.category}
        </span>{" "}
        /<span className="text-black font-medium"> {product.name}</span>
      </div>

      {/* 🌟 Product Section */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left - Image Gallery */}
        <div className="flex flex-col lg:flex-row gap-6 w-full lg:w-1/2">
          <div className="flex lg:flex-col gap-4 justify-center">
            {[product.image, product.image, product.image, product.image].map(
              (img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={product.name}
                  className="w-20 h-20 object-contain border rounded-lg p-2 cursor-pointer hover:border-red-500 transition"
                />
              )
            )}
          </div>
          <div className="flex-1 flex items-center justify-center bg-white rounded-xl p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-[70%] h-[70%] object-contain"
            />
          </div>
        </div>

        {/* Right - Product Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
            <FaStar className="text-gray-300" />
            <span className="text-sm text-gray-500 ml-2">(150 Reviews)</span>
            <span className="text-green-600 font-medium ml-2">In Stock</span>
          </div>

          {/* Price */}
          <p className="text-2xl font-bold mb-4 text-red-400">
            ₹ <span className="text-cyan-600">{product.price.toFixed(2)}</span>{" "}
            ONLY
          </p>

          <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc list-inside">
            {product.specs && product.specs.length > 0 ? (
              product.specs
                .slice(0, 5)
                .map((spec, index) => <li key={index}>{spec}</li>)
            ) : product.description ? (
              product.description
                .split(/[\n\.]+/) // split by newline or period
                .map((point, index) => {
                  const trimmed = point.trim();
                  return trimmed ? <li key={index}>{trimmed}</li> : null;
                })
            ) : (
              <li>No additional details available</li>
            )}
          </ul>

          <p className="text-xl font-bold text-gray-800 mb-4">
            Total: ₹ {totalPrice.toFixed(2)}
          </p>

          {/* Quantity & Buttons */}
          <div className="gap-4 mb-6">
            <div className="flex items-center border rounded-md w-fit my-5">
              <button
                onClick={decreaseQty}
                className="px-3 py-2 text-lg font-bold hover:bg-gray-100"
              >
                <FaMinus />
              </button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button
                onClick={increaseQty}
                className="px-3 py-2 text-lg font-bold hover:bg-gray-100"
              >
                <FaPlus />
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => toggleCart(product)}
                className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition"
              >
                Add To Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Buy Now
              </button>
              <button
                onClick={() => toggleFavorite(product)}
                className="border p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <FaHeart />
              </button>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="border rounded-lg divide-y divide-gray-200">
            <div className="flex items-center justify-between p-4">
              <div>
                <h4 className="font-medium text-gray-800">Free Delivery</h4>
                <p className="text-sm text-gray-500">
                  Enter your postal code for delivery availability
                </p>
              </div>
              <span className="text-gray-400">&gt;</span>
            </div>

            <div className="flex items-center justify-between p-4">
              <div>
                <h4 className="font-medium text-gray-800">Return Delivery</h4>
                <p className="text-sm text-gray-500">
                  Free 30 days return. Details
                </p>
              </div>
              <span className="text-gray-400">&gt;</span>
            </div>
          </div>
        </div>
      </div>

      {/* 📝 Product Details */}
      <div className="mt-16 bg-white rounded-xl p-8 shadow-md">
        <h3 className="text-xl font-semibold mb-4">Product Details</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          {product.longDescription ||
            "This premium-quality product is crafted with precision and designed to meet your everyday needs. Enjoy durability, comfort, and superior performance."}
        </p>
        <ul className="list-disc ml-6 text-gray-600 space-y-2">
          <li>High-quality material</li>
          <li>1 Year Brand Warranty</li>
          <li>Available in multiple colors</li>
          <li>Free shipping & 30-day return policy</li>
        </ul>
      </div>

      {/* 🛍️ Related Products */}
      {related.length > 0 && (
        <div className="mt-20">
          <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">
            Related Products in{" "}
            <span className="text-cyan-600">{product.category}</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {related.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/product/${item._id}`)}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
              >
                <div className="bg-gray-50 h-52 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                    {item.category}
                  </p>
                  <h4 className="font-semibold text-lg mb-2 truncate text-gray-800 group-hover:text-cyan-600">
                    {item.name}
                  </h4>

                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(4)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                    <span className="text-gray-500 text-xs ml-1">(4.2)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="text-red-500 font-bold text-lg">
                      ₹{item.price}
                    </p>
                    <p className="text-gray-400 text-sm line-through">
                      ₹{(item.price * 1.2).toFixed(0)}
                    </p>
                    <span className="text-green-600 text-sm font-medium">
                      20% off
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="bg-cyan-500 text-white px-5 py-2 rounded-full font-medium hover:bg-cyan-600 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
