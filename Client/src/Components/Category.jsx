import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  FaMobileAlt,
  FaLaptop,
  FaCamera,
  FaHeadphones,
  FaGamepad,
  FaClock,
  FaEye,
  FaHeart,
} from "react-icons/fa";
import { FaStar, FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "Phones", icon: <FaMobileAlt size={28} /> },
  { id: 2, name: "Computers", icon: <FaLaptop size={28} /> },
  { id: 3, name: "SmartWatch", icon: <FaClock size={28} /> },
  { id: 4, name: "Camera", icon: <FaCamera size={28} /> },
  { id: 5, name: "HeadPhones", icon: <FaHeadphones size={28} /> },
  { id: 6, name: "Gaming", icon: <FaGamepad size={28} /> },
];

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  // Fetch products by category
  const fetchProducts = async (category) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/prd/matchProduct?category=${category}`
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Trigger fetch when category changes
  useEffect(() => {
    if (selectedCategory) fetchProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="w-full py-10 bg-white">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 px-6 md:px-12">
        <div>
          <p className="text-red-500 text-sm font-semibold">Categories</p>
          <h2 className="text-2xl md:text-3xl font-bold">Browse By Category</h2>
        </div>
      </div>

      {/* Category Slider */}
      <Swiper
        slidesPerView={2}
        spaceBetween={15}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 6 },
        }}
        className="px-6 md:px-12"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <div
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex flex-col items-center justify-center border rounded-xl py-6 m-3  cursor-pointer transition-all duration-300 ${
                selectedCategory === cat.name
                  ? "bg-cyan-500 text-white border-cyan-500 scale-105"
                  : "bg-white hover:bg-gray-100 border-gray-300"
              }`}
            >
              {cat.icon}
              <span className="mt-3 font-medium">{cat.name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Products List */}
      <div className="mt-10 px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((item) => (
            <Link to={`/product/${item._id}`}>
            <div className="border rounded-xl p-5 bg-white hover:shadow-xl transition-all flex flex-col items-center text-center group relative">
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                -{Math.floor(Math.random() * 40) + 10}%
              </div>

              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
                <button className="bg-white p-2 rounded-full shadow hover:text-red-500">
                  <FaHeart />
                </button>
                <button className="bg-white p-2 rounded-full shadow hover:text-blue-500">
                  <FaEye />
                </button>
              </div>

              <img
                src={item.image}
                alt={item.name}
                className="w-[60%] h-40 object-contain mb-4 group-hover:scale-105 transition-transform"
              />

              <h3 className="font-semibold text-lg text-gray-800 mb-1">
                {item.name}
              </h3>

              <p className="text-gray-500 text-sm mb-2">{item.category}</p>

              <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                {item.description}
              </p>

              <div className="flex justify-center items-center gap-2 mb-2">
                <p className="text-red-500 font-bold text-lg">${item.price}</p>
                <p className="text-gray-400 line-through text-sm">
                  ${(item.price * 1.2).toFixed(0)}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 mb-3 text-sm text-gray-500">
                <FaBoxOpen />
                <span>
                  {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
                </span>
              </div>

              <button
                className={`w-full py-2 rounded-md font-semibold transition-all ${
                  item.stock > 0
                    ? "bg-cyan-400 text-white hover:bg-cyan-500"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {item.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>

              <div className="flex justify-center mt-3 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} />
                ))}
              </div>
            </div>
            </Link>
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-500">
            {selectedCategory
              ? "No products found in this category."
              : "Select a category to view products."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Category;
