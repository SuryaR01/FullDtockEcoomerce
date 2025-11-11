import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaStar,
  FaRegStar,
  FaEye,
  FaShoppingCart,
  FaMobileAlt,
  FaLaptop,
  FaClock,
  FaCamera,
  FaHeadphones,
  FaGamepad,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const categoryOptions = [
  { id: 1, name: "Phones", icon: <FaMobileAlt size={20} /> },
  { id: 2, name: "Computers", icon: <FaLaptop size={20} /> },
  { id: 3, name: "SmartWatch", icon: <FaClock size={20} /> },
  { id: 4, name: "Camera", icon: <FaCamera size={20} /> },
  { id: 5, name: "HeadPhones", icon: <FaHeadphones size={20} /> },
  { id: 6, name: "Gaming", icon: <FaGamepad size={20} /> },
];

// ✅ Updated price options (up to ₹1L)
const priceOptions = [
  0, 5000, 10000, 15000, 20000, 30000, 40000, 50000, 75000, 100000,
];

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Price filters
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const { favorites, toggleFavorite } = useFavorites();
  const { toggleCart } = useCart();

  // ✅ Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
  }, []);

  // ✅ Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/prd/products");
      const productList = Array.isArray(res.data)
        ? res.data
        : res.data.products || [];
      setProducts(productList);
      setFiltered(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Filter products dynamically
  useEffect(() => {
    let updated = [...products];

    // Filter by category
    if (selectedCategory !== "All") {
      updated = updated.filter(
        (p) =>
          p.category &&
          p.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Filter by price range
    updated = updated.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    setFiltered(updated);
  }, [selectedCategory, minPrice, maxPrice, products]);

  const isFavorite = (id) => favorites.some((fav) => fav.productId?._id === id);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-cyan-600 text-xl font-semibold">
        Loading products...
      </div>
    );
  }

  return (
    <>
      <div className="text-md text-gray-500 pt-10 pl-10 bg-gray-50">
        <Link to={"/"}> Home </Link>/{" "}
        <span className="text-cyan-600 font-medium">All Product</span>
      </div>
      <div className="flex flex-col md:flex-row gap-6 bg-gray-50 min-h-screen p-6 md:p-10">
        {/* Sidebar Filter */}
        <aside className="md:w-[500px] w-full bg-white rounded-xl shadow-md p-4 h-fit md:sticky top-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-3">Category</h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg border ${
                  selectedCategory === "All"
                    ? "bg-cyan-600 text-white border-cyan-600"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                } transition`}
              >
                All
              </button>

              {categoryOptions.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg border ${
                    selectedCategory === cat.name
                      ? "bg-cyan-600 text-white border-cyan-600"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  } transition`}
                >
                  {cat.icon}
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Price</h3>

            {/* Range Slider */}
            <div className="flex flex-col gap-2 mb-3">
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(Math.min(Number(e.target.value), maxPrice - 1000))
                }
                className="w-full accent-cyan-600"
              />
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Math.max(Number(e.target.value), minPrice + 1000))
                }
                className="w-full accent-cyan-600"
              />
            </div>

            {/* Dropdowns */}
            <div className="flex items-center gap-2">
              <select
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(Math.min(Number(e.target.value), maxPrice - 1000))
                }
                className="border rounded-md px-2 py-1 w-full"
              >
                <option value="0">Min</option>
                {priceOptions.map((p) => (
                  <option key={p} value={p}>
                    ₹{p.toLocaleString()}
                  </option>
                ))}
              </select>

              <span className="text-gray-600">to</span>

              <select
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Math.max(Number(e.target.value), minPrice + 1000))
                }
                className="border rounded-md px-2 py-1 w-full"
              >
                {priceOptions.map((p) => (
                  <option key={p} value={p}>
                    ₹{p.toLocaleString()}
                  </option>
                ))}
                <option value="100000">₹1,00,000+</option>
              </select>
            </div>

            <p className="text-sm text-gray-600 mt-2">
              Price: ₹{minPrice.toLocaleString()} – ₹
              {maxPrice >= 100000 ? "1,00,000+" : maxPrice.toLocaleString()}
            </p>

            <button
              onClick={() => {
                setMinPrice(0);
                setMaxPrice(100000);
              }}
              className="mt-3 text-sm text-cyan-600 hover:underline"
            >
              Clear Price Filter
            </button>
          </div>
        </aside>

        {/* Product Section */}
        <section className="flex-1">
          {/* Header */}
          <div className="text-center mb-10">
            <h4 className="text-cyan-600 font-semibold uppercase tracking-widest mb-2">
              Our Collection
            </h4>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Explore All Products
            </h1>
            <p className="text-gray-500 mt-3 text-sm md:text-base max-w-2xl mx-auto">
              Browse through our collection of high-quality products. Filter by
              category or price range to find your perfect match.
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
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No products found in this filter.
            </p>
          ) : (
            // <div className="space-y-4 md:w-[1100px]">
            //   {filtered.map((product) => (
            //     <div
            //       key={product._id}
            //       className="flex flex-col sm:flex-row items-center justify-center sm:items-start bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden p-4 relative group"
            //     >
            //       {/* ❤️ Favorite Button */}
            //       <button
            //         onClick={() => toggleFavorite(product)}
            //         className={`absolute top-3 right-3 z-10 px-2 py-1 rounded-full text-lg ${
            //           isFavorite(product._id)
            //             ? "bg-red-500 text-white"
            //             : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            //         }`}
            //       >
            //         {isFavorite(product._id) ? "❤️" : "🤍"}
            //       </button>

            //       {/* 🖼️ Product Image */}
            //       <div className="flex justify-center items-center bg-gray-50 w-40 h-40 sm:w-44 sm:h-44 rounded-lg">
            //         <img
            //           src={product.image}
            //           alt={product.name}
            //           className="object-contain w-45 h-45 group-hover:scale-105 transition-transform duration-300"
            //         />
            //       </div>

            //       {/* 📄 Product Info */}
            //       <div className="flex-1 sm:ml-6 mt-4 sm:mt-0 text-left">
            //         {/* Name */}
            //         <h3 className="text-lg font-semibold text-gray-800 hover:text-cyan-700 cursor-pointer truncate">
            //           {product.name}
            //         </h3>

            //         {/* Rating */}
            //         <div className="flex items-center mt-1">
            //           <span className="text-green-600 font-semibold text-sm mr-2">
            //             {product.rating ? product.rating.toFixed(1) : "4.0"}
            //           </span>
            //           <div className="flex">
            //             {Array(5)
            //               .fill()
            //               .map((_, i) =>
            //                 i < Math.round(product.rating || 3.5) ? (
            //                   <FaStar key={i} className="text-yellow-400" />
            //                 ) : (
            //                   <FaRegStar key={i} className="text-gray-300" />
            //                 )
            //               )}
            //           </div>
            //           {product.reviews && (
            //             <span className="text-gray-500 text-sm ml-2">
            //               ({product.reviews})
            //             </span>
            //           )}
            //         </div>

            //         {/* Description / Specs */}
            //         <ul className="text-sm text-gray-600 mt-2 space-y-1 text-justify list-disc list-inside">
            //           {product.specs && product.specs.length > 0 ? (
            //             product.specs
            //               .slice(0, 5)
            //               .map((spec, index) => <li key={index}>{spec}</li>)
            //           ) : product.description ? (
            //             product.description
            //               .split(/[\n\.]+/) // split by newline or period
            //               .map((point, index) => {
            //                 const trimmed = point.trim();
            //                 return trimmed ? (
            //                   <li key={index}>{trimmed}</li>
            //                 ) : null;
            //               })
            //           ) : (
            //             <li>No additional details available</li>
            //           )}
            //         </ul>

            //         {/* 💰 Price Section */}
            //         <div className="mt-3 flex items-center gap-2">
            //           <p className="text-2xl font-bold text-gray-900">
            //             ₹{product.price}
            //           </p>
            //           {product.originalPrice && (
            //             <>
            //               <p className="text-gray-500 line-through text-sm">
            //                 ₹{product.originalPrice}
            //               </p>
            //               <p className="text-green-600 font-semibold text-sm">
            //                 {Math.round(
            //                   ((product.originalPrice - product.price) /
            //                     product.originalPrice) *
            //                     100
            //                 )}
            //                 % off
            //               </p>
            //             </>
            //           )}
            //         </div>

            //         {/* ⚙️ Action Buttons */}
            //         <div className="flex gap-3 mt-4">
            //           <button
            //             onClick={() => toggleCart(product)}
            //             className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition"
            //           >
            //             <FaShoppingCart /> Add to Cart
            //           </button>
            //           <Link
            //             to={`/product/${product._id}`}
            //             className="flex items-center gap-2 border border-cyan-600 text-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-600 hover:text-white transition"
            //           >
            //             <FaEye /> View
            //           </Link>
            //         </div>
            //       </div>
            //     </div>
            //   ))}
            // </div>

            <div className="space-y-6 md:w-[1100px] mx-auto">
              {filtered.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col sm:flex-row bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden p-5 relative group items-start sm:items-center"
                >
                  {/* ❤️ Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product)}
                    className={`absolute top-3 right-3 z-10 px-2 py-1 rounded-full text-lg ${
                      isFavorite(product._id)
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {isFavorite(product._id) ? "❤️" : "🤍"}
                  </button>

                  {/* 🖼️ Product Image */}
                  <div className="flex-shrink-0 flex justify-center items-center bg-gray-50 w-36 h-36 sm:w-44 sm:h-44 rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* 📄 Product Info */}
                  <div className="flex flex-col justify-between flex-1 sm:ml-6 mt-4 sm:mt-0 text-left">
                    {/* Product Name */}
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-cyan-700 cursor-pointer truncate">
                      {product.name}
                    </h3>

                    {/* ⭐ Rating */}
                    <div className="flex items-center mt-1">
                      <span className="text-green-600 font-semibold text-sm mr-2">
                        {product.rating ? product.rating.toFixed(1) : "4.0"}
                      </span>
                      <div className="flex">
                        {Array(5)
                          .fill()
                          .map((_, i) =>
                            i < Math.round(product.rating || 3.5) ? (
                              <FaStar key={i} className="text-yellow-400" />
                            ) : (
                              <FaRegStar key={i} className="text-gray-300" />
                            )
                          )}
                      </div>
                      {product.reviews && (
                        <span className="text-gray-500 text-sm ml-2">
                          ({product.reviews})
                        </span>
                      )}
                    </div>

                    {/* 📋 Description / Specs */}
                    <ul className="text-sm text-gray-600 mt-2 space-y-1 text-justify w-[600px] list-disc list-inside">
                      {product.specs && product.specs.length > 0 ? (
                        product.specs
                          .slice(0, 5)
                          .map((spec, index) => <li key={index}>{spec}</li>)
                      ) : product.description ? (
                        product.description
                          .split(/[\n\.]+/)
                           .slice(0, 3)
                          .map((point, index) => {
                            const trimmed = point.trim();
                            return trimmed ? (
                              <li key={index}>{trimmed}</li>
                            ) : null;
                          })
                      ) : (
                        <li>No additional details available</li>
                      )}
                    </ul>

                    {/* 💰 Price */}
                    <div className="mt-3 flex items-center flex-wrap gap-2">
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{product.price}
                      </p>
                      {product.originalPrice && (
                        <>
                          <p className="text-gray-500 line-through text-sm">
                            ₹{product.originalPrice}
                          </p>
                          <p className="text-green-600 font-semibold text-sm">
                            {Math.round(
                              ((product.originalPrice - product.price) /
                                product.originalPrice) *
                                100
                            )}
                            % off
                          </p>
                        </>
                      )}
                    </div>

                    {/* ⚙️ Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-4">
                      <button
                        onClick={() => toggleCart(product)}
                        className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition"
                      >
                        <FaShoppingCart /> Add to Cart
                      </button>
                      <Link
                        to={`/product/${product._id}`}
                        className="flex items-center gap-2 border border-cyan-600 text-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-600 hover:text-white transition"
                      >
                        <FaEye /> View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default AllProducts;
