import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSignOutAlt,
  FaUserShield,
  FaBars,
} from "react-icons/fa";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

  const handleLoginLogout = () => setIsLoggedIn(!isLoggedIn);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">MyShop</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium text-gray-700">
          <li>
            <Link to="/" className="hover:text-blue-600">Home</Link>
          </li>
          <li>
            <Link to="/category" className="hover:text-blue-600">Category</Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-blue-600">Products</Link>
          </li>
          <li>
            <Link to="/service" className="hover:text-blue-600">Service</Link>
          </li>
        </ul>

        {/* Icons Section */}
        <div className="hidden md:flex items-center space-x-5 text-gray-700">

          {/* ❤️ Wishlist SideSheet */}
          <Sheet open={openWishlist} onOpenChange={setOpenWishlist}>
            <SheetTrigger asChild>
              <button
                onClick={() => setOpenWishlist(true)}
                className="hover:text-red-500 text-xl"
              >
                <FaHeart />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="text-red-500">Your Wishlist ❤️</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-3 text-gray-700">
                {/* You can map wishlist items here */}
                <p>No items in your wishlist yet!</p>
              </div>
            </SheetContent>
          </Sheet>

          {/* 🛒 Cart SideSheet */}
          <Sheet open={openCart} onOpenChange={setOpenCart}>
            <SheetTrigger asChild>
              <button
                onClick={() => setOpenCart(true)}
                className="hover:text-green-600 text-xl"
              >
                <FaShoppingCart />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="text-green-600">Your Cart 🛒</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-3 text-gray-700">
                {/* You can map cart items here */}
                <p>Your cart is empty!</p>
              </div>
            </SheetContent>
          </Sheet>

          {/* 👤 Login / Logout */}
          {!isLoggedIn ? (
            <button
              onClick={handleLoginLogout}
              className="flex items-center gap-1 hover:text-blue-600"
            >
              <FaUser /> <span>Login</span>
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/admin"
                className="flex items-center gap-1 hover:text-yellow-600"
              >
                <FaUserShield /> <span>Admin</span>
              </Link>
              <button
                onClick={handleLoginLogout}
                className="flex items-center gap-1 hover:text-red-600"
              >
                <FaSignOutAlt /> <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="text-2xl text-gray-700">
              <FaBars />
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-blue-600 text-xl font-bold mb-4">
                  MyShop Menu
                </SheetTitle>
              </SheetHeader>

              <ul className="space-y-4 mt-4 ml-4 text-gray-700 font-medium">
                <li><Link to="/" className="block hover:text-blue-600">Home</Link></li>
                <li><Link to="/category" className="block hover:text-blue-600">Category</Link></li>
                <li><Link to="/products" className="block hover:text-blue-600">Products</Link></li>
                <li><Link to="/service" className="block hover:text-blue-600">Service</Link></li>
              </ul>

              <div className="border-t my-4"></div>

              <div className="flex flex-col ml-4 space-y-3 text-gray-700">
                <button
                  onClick={() => setOpenWishlist(true)}
                  className="flex items-center gap-2 hover:text-red-500"
                >
                  <FaHeart /> Wishlist
                </button>
                <button
                  onClick={() => setOpenCart(true)}
                  className="flex items-center gap-2 hover:text-green-600"
                >
                  <FaShoppingCart /> Cart
                </button>

                {!isLoggedIn ? (
                  <button
                    onClick={handleLoginLogout}
                    className="flex items-center gap-2 hover:text-blue-600"
                  >
                    <FaUser /> Login
                  </button>
                ) : (
                  <>
                    <Link to="/admin" className="flex items-center gap-2 hover:text-yellow-600">
                      <FaUserShield /> Admin
                    </Link>
                    <button
                      onClick={handleLoginLogout}
                      className="flex items-center gap-2 hover:text-red-600"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
