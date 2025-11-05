import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaStar, FaHeart, FaPlus, FaMinus } from "react-icons/fa";

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch product by ID
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/prd/getproduct/${id}`);
      setProduct(res.data);
      setTotalPrice(res.data.price); // initialize total price
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Update total price when quantity changes
  useEffect(() => {
    if (product) {
      setTotalPrice(product.price * quantity);
    }
  }, [quantity, product]);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-16">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-red-500">
          Account
        </Link>{" "}
        /{" "}
        <span className="hover:text-red-500 cursor-pointer">
          {product.category}
        </span>{" "}
        /{" "}
        <span className="text-black font-medium">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side - Image Gallery */}
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

        {/* Right Side - Product Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

          {/* Ratings */}
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
           {/* ₹{totalPrice.toFixed(2)} */}
           ₹  <span className="text-cyan-600">{product.price.toFixed(2)} </span> ONLY
          </p>
         

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* dynamic price */}
          <p className="text-xl font-bold text-gray-800 mb-4">
           ₹ {totalPrice.toFixed(2)}
          </p>

          {/* Quantity and Buttons */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-md">
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

            <button className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition">
              Buy Now
            </button>

            <button className="border p-3 rounded-lg hover:bg-gray-100 transition">
              <FaHeart />
            </button>
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
    </div>
  );
};

export default ViewProduct;
