

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaStar, FaHeart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const FlashSaleProduct = () => {
  const [products, setProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 59,
    seconds: 50,
  });

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/prd/products");

        const data = Array.isArray(res.data) ? res.data : res.data.products;
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full px-6 py-10 bg-white">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h4 className="text-red-500 font-semibold mb-1">🔥 Today's</h4>
          <h2 className="text-3xl font-bold text-gray-800">Flash Sales</h2>
        </div>

        {/* TIMER */}
        <div className="flex gap-4 text-center mt-4 md:mt-0">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label}>
              <p className="text-2xl font-bold">
                {String(value).padStart(2, "0")}
              </p>
              <p className="text-xs uppercase text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCT SLIDER */}
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        // navigation={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: true,
        }}
        loop={true}
        modules={[Navigation]}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <Link to={`/product/${product._id}`}>
            <div className="border rounded-lg overflow-hidden bg-gray-50 hover:shadow-lg transition-all duration-300 relative group">
              {/* Wishlist + View */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
                <button className="bg-white p-2 rounded-full shadow hover:text-red-500">
                  <FaHeart />
                </button>
                <button className="bg-white p-2 rounded-full shadow hover:text-blue-500">
                  <FaEye />
                </button>
              </div>

              {/* Product Image */}
              <div className="w-full h-48 flex items-center justify-center bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain h-full pt-2"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-gray-800 font-bold text-md capitalize mb-2 line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-gray-500 text-xs mb-2 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-red-500 font-bold">
                    ${product.price}
                  </span>
                  <span className="text-gray-400 text-sm capitalize bg-gray-100 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < 4 ? "text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>

                {/* Stock Info */}
                <p
                  className={`text-sm mb-2 ${
                    product.stock > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of Stock"}
                </p>

                {/* Button */}
                <button
                  className={`w-full py-2 rounded-md text-white font-semibold shadow ${
                    product.stock > 0
                      ? "bg-cyan-500 hover:bg-cyan-800"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={product.stock <= 0}
                >
                  {product.stock > 0 ? "Add To Cart" : "Unavailable"}
                </button>
              </div>
            </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* VIEW ALL */}
      <div className="flex justify-center mt-8">
        <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-md shadow">
          View All Products
        </button>
      </div>
    </div>
  );
};

export default FlashSaleProduct;


