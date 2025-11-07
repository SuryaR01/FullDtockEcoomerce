import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaUserShield,
  FaBars,
  FaEllipsisV,
  FaSearch,
  FaHeart,
  FaTrash,
} from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFavorites } from "../context/FavoritesContext";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const [openCart, setOpenCart] = useState(false);
  const [openFavorites, setOpenFavorites] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const { cart, toggleCart } = useCart();

  let user = JSON.parse(localStorage.getItem("user") || "null");

  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) user = JSON.parse(storedUser);
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    navigate("/userlogin");
  };

  // ✅ Extract first letter of email or username
  const firstLetter =
    user?.username?.charAt(0)?.toUpperCase() ||
    user?.userName?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "?";

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* ================= LEFT: LOGO ================= */}
        <Link to="/" className="flex flex-col leading-tight">
          <span className="text-2xl font-bold text-cyan-600">MyApp</span>
          <span className="text-xs text-gray-500 italic">
            Explore{" "}
            <span className="text-yellow-500 font-semibold">Plus ✨</span>
          </span>
        </Link>

        {/* ================= CENTER: SEARCH BAR ================= */}
        <div className="hidden md:flex items-center bg-cyan-50 rounded-md px-3 py-1 w-1/2">
          <FaSearch className="text-gray-400 text-lg mr-2" />
          <input
            type="text"
            placeholder="Search for Products, Brands and More"
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          {/* ✅ Admin Dashboard Link */}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="flex items-center gap-2 text-cyan-600 font-semibold hover:text-cyan-700"
            >
              <FaUserShield /> Dashboard
            </Link>
          )}

          {/* ✅ User Avatar / Login Button */}
          <div
            className="relative"
            onMouseEnter={() => setShowLoginMenu(true)}
            onMouseLeave={() => setShowLoginMenu(false)}
          >
            {!user ? (
              <Link
                to="/userlogin"
                className="flex items-center gap-1 bg-cyan-600 text-white px-4 py-1 rounded-md hover:bg-cyan-700"
              >
                <FaUser /> Login
              </Link>
            ) : (
              <div className="flex items-center gap-3 cursor-pointer">
                {/* ✅ First Letter Avatar */}
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-600 text-white font-bold">
                  {firstLetter}
                </div>
                <span className="font-medium text-cyan-700">
                  {user.username || user.userName || user.email}
                </span>
              </div>
            )}

            {/* ✅ Dropdown Menu */}
            {showLoginMenu && user && (
              <div className="absolute right-0 w-56 bg-white rounded-md shadow-lg border z-50">
                <ul className="text-gray-700 text-sm">
                  <Link
                    to="/profile"
                    className="px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FaUser /> My Profile
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      className="px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-cyan-600 font-semibold"
                    >
                      <FaUserShield /> Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </ul>
              </div>
            )}
          </div>

          {/* ✅ CART Drawer */}
          {/* <Sheet open={openCart} onOpenChange={setOpenCart}>
            <SheetTrigger asChild>
              <button
                onClick={() => setOpenCart(true)}
                className="flex items-center gap-2 hover:text-cyan-600"
              >
                <FaShoppingCart /> Cart ({cart.length})
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-96">
              <SheetHeader>
                <SheetTitle className="text-cyan-600">Your Cart 🛒</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center">
                    No items in your cart!
                  </p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg shadow-sm"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">
                          {item.product.name}
                        </h4>
                        <p className="text-cyan-600 font-medium">
                          ₹{item.product.price}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.product.quantity || 1}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleCart(item.product)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </SheetContent>
          </Sheet> */}

          <Sheet open={openCart} onOpenChange={setOpenCart}>
  <SheetTrigger asChild>
    <button
      onClick={() => setOpenCart(true)}
      className="flex items-center gap-2 hover:text-cyan-600"
    >
      <FaShoppingCart /> Cart ({cart.length})
    </button>
  </SheetTrigger>

  <SheetContent side="right" className="w-96 flex flex-col">
    <SheetHeader>
      <SheetTitle className="text-cyan-600">Your Cart 🛒</SheetTitle>
    </SheetHeader>

  
    <div className="mt-6 flex-1 overflow-y-auto space-y-4 pr-2">
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">No items in your cart!</p>
      ) : (
        cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg shadow-sm"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">
                {item.product.name}
              </h4>
              <p className="text-cyan-600 font-medium">
                ₹{item.product.price}
              </p>
              <p className="text-sm text-gray-500">
                Qty: {item.product.quantity || 1}
              </p>
            </div>
            <button
              onClick={() => toggleCart(item.product)}
              className="text-red-500 hover:text-red-600"
            >
              <FaTrash />
            </button>
          </div>
        ))
      )}
    </div>

    {cart.length > 0 && (
      <div className="mt-4 border-t pt-4 mb-3 flex justify-center">
        <button
          onClick={() => {
            setOpenCart(false);
            navigate("/checkout"); 
          }}
          className="w-fit bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-15 rounded-md transition"
        >
          Move to CheckOut
        </button>
      </div>
    )}
  </SheetContent>
</Sheet>



          {/* ✅ FAVORITES Drawer */}
          <Sheet open={openFavorites} onOpenChange={setOpenFavorites}>
            <SheetTrigger asChild>
              <button
                onClick={() => setOpenFavorites(true)}
                className="flex items-center gap-2 hover:text-cyan-600 transition"
              >
                <FaHeart /> Like ({favorites.length})
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-96 overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-cyan-600">
                  Your Like List ❤️
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-4">
                {favorites.length === 0 ? (
                  <p className="text-gray-500 text-center">
                    No liked products yet!
                  </p>
                ) : (
                  favorites.map((item) => {
                    // ✅ Support both structures (old and new)
                    const product = item.product || item;

                    return (
                      <div
                        key={item._id}
                        className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg shadow-sm"
                      >
                        <img
                          src={
                            product?.image ||
                            "https://via.placeholder.com/150?text=No+Image"
                          }
                          alt={product?.name || "Product"}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">
                            {product?.name || "Unnamed"}
                          </h4>
                          <p className="text-cyan-600 font-medium">
                            ${product?.price || "N/A"}
                          </p>
                        </div>
                         <button
                           onClick={() => toggleCart(product)}
                          className="text-green-500 hover:text-red-600"
                        >
                          <IoCartOutline />
                        </button>
                        <button
                          onClick={() => toggleFavorite(product)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Menu Icon */}
          <button className="text-xl hover:text-cyan-600">
            <FaEllipsisV />
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <div className="md:hidden flex items-center gap-4">
          <FaSearch className="text-gray-600 text-lg" />
          <Sheet>
            <SheetTrigger>
              <FaBars className="text-2xl text-gray-700" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-cyan-600 text-lg font-bold">
                  MyApp Menu
                </SheetTitle>
              </SheetHeader>
              <ul className="mt-4 ml-4 space-y-4 text-gray-700 font-medium">
                <li>
                  <Link to="/" className="block hover:text-cyan-600">
                    Home
                  </Link>
                </li>
                {user?.role === "admin" && (
                  <li>
                    <Link to="/admin" className="block hover:text-cyan-600">
                      Admin Panel
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/products" className="block hover:text-cyan-600">
                    Products
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setOpenCart(true)}
                    className="flex items-center gap-2 hover:text-cyan-600"
                  >
                    <FaShoppingCart /> Cart
                  </button>
                </li>
                <li>
                  {!user ? (
                    <Link
                      to="/userlogin"
                      className="flex items-center gap-2 hover:text-cyan-600"
                    >
                      <FaUser /> Login
                    </Link>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 hover:text-cyan-600"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  )}
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
