

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaShoppingCart,
//   FaUser,
//   FaSignOutAlt,
//   FaUserShield,
//   FaBars,
//   FaEllipsisV,
//   FaSearch,
// } from "react-icons/fa";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// const Nav = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [openCart, setOpenCart] = useState(false);
//   const [showLoginMenu, setShowLoginMenu] = useState(false);

//   const handleLoginLogout = () => setIsLoggedIn(!isLoggedIn);

//   return (
//     <nav className="bg-white shadow-sm sticky top-0 z-50">
//       <div className="container mx-auto flex items-center justify-between px-4 py-2">
//         {/* ================= LEFT: LOGO ================= */}
//         <Link to="/" className="flex flex-col leading-tight">
//           <span className="text-2xl font-bold text-blue-600">Flipkart</span>
//           <span className="text-xs text-gray-500 italic">
//             Explore <span className="text-yellow-500 font-semibold">Plus ✨</span>
//           </span>
//         </Link>

//         {/* ================= CENTER: SEARCH BAR ================= */}
//         <div className="hidden md:flex items-center bg-blue-50 rounded-md px-3 py-1 w-1/2">
//           <FaSearch className="text-gray-400 text-lg mr-2" />
//           <input
//             type="text"
//             placeholder="Search for Products, Brands and More"
//             className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
//           />
//         </div>

//         {/* ================= RIGHT: ICONS / LOGIN ================= */}
//         <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
//           {/* Login Dropdown */}
//           <div
//             className="relative"
//             onMouseEnter={() => setShowLoginMenu(true)}
//             onMouseLeave={() => setShowLoginMenu(false)}
//           >
//             <Link to={"/userlogin"} className="flex items-center gap-1 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700">
//               <FaUser /> Login
//             </Link>

//             {/* Dropdown Menu */}
//             {showLoginMenu && (
//               <div className="absolute right-0 mt-0 w-56 bg-white rounded-md shadow-lg border">
//                 <div className="px-4 py-2 flex justify-between items-center border-b">
//                   <span className="text-gray-700 text-sm">New customer?</span>
//                   <Link to="/register" className="text-blue-600 text-sm font-semibold">
//                     Sign Up
//                   </Link>
//                 </div>
//                 <ul className="text-gray-700 text-sm">
//                   <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2">
//                     <FaUser /> My Profile
//                   </li>
//                   <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2">
//                     🏅 Flipkart Plus Zone
//                   </li>
//                   <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2">
//                     📦 Orders
//                   </li>
//                   <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2">
//                     ❤️ Wishlist
//                   </li>
//                   <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2">
//                     🎁 Rewards
//                   </li>
//                   <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2">
//                     🎟️ Gift Cards
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Cart Button */}
//           <Sheet open={openCart} onOpenChange={setOpenCart}>
//             <SheetTrigger asChild>
//               <button
//                 onClick={() => setOpenCart(true)}
//                 className="flex items-center gap-2 hover:text-blue-600"
//               >
//                 <FaShoppingCart /> Cart
//               </button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-80">
//               <SheetHeader>
//                 <SheetTitle className="text-green-600">Your Cart 🛒</SheetTitle>
//               </SheetHeader>
//               <div className="mt-4 text-gray-700">
//                 <p>Your cart is empty!</p>
//               </div>
//             </SheetContent>
//           </Sheet>

//           {/* Become a Seller */}
//           <Link to="/seller" className="hover:text-blue-600">
//             Become a Seller
//           </Link>

//           {/* Menu Icon */}
//           <button className="text-xl hover:text-blue-600">
//             <FaEllipsisV />
//           </button>
//         </div>

//         {/* ================= MOBILE MENU ================= */}
//         <div className="md:hidden flex items-center gap-4">
//           <FaSearch className="text-gray-600 text-lg" />
//           <Sheet>
//             <SheetTrigger>
//               <FaBars className="text-2xl text-gray-700" />
//             </SheetTrigger>
//             <SheetContent side="right" className="w-64">
//               <SheetHeader>
//                 <SheetTitle className="text-blue-600 text-lg font-bold">
//                   Flipkart Menu
//                 </SheetTitle>
//               </SheetHeader>
//               <ul className="mt-4 ml-4 space-y-4 text-gray-700 font-medium">
//                 <li><Link to="/" className="block hover:text-blue-600">Home</Link></li>
//                 <li><Link to="/products" className="block hover:text-blue-600">Products</Link></li>
//                 <li><Link to="/seller" className="block hover:text-blue-600">Become a Seller</Link></li>
//                 <li><button onClick={() => setOpenCart(true)} className="flex items-center gap-2 hover:text-blue-600"><FaShoppingCart /> Cart</button></li>
//                 <li><button onClick={handleLoginLogout} className="flex items-center gap-2 hover:text-blue-600"><FaUser /> Login</button></li>
//               </ul>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Nav;



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
  FaHeart
} from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const navigate = useNavigate();
  const [openCart, setOpenCart] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/userlogin");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* ================= LEFT: LOGO ================= */}
        <Link to="/" className="flex flex-col leading-tight">
          <span className="text-2xl font-bold text-cyan-600">MyApp</span>
          <span className="text-xs text-gray-500 italic">
            Explore <span className="text-yellow-500 font-semibold">Plus ✨</span>
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

        {/* ================= RIGHT: ICONS / LOGIN ================= */}
        <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          {/* Admin Dashboard Link */}
          {user && user.isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-2 text-cyan-600 font-semibold hover:text-cyan-700"
            >
              <FaUserShield /> Dashboard
            </Link>
          )}

          {/* Login Dropdown / User Menu */}
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
              <button className="flex items-center gap-2 text-cyan-700 font-semibold">
                <FaUser /> {user.name || "User"}
              </button>
            )}

            {/* Dropdown Menu */}
            {showLoginMenu && (
              <div className="absolute right-0 mt-0 w-56 bg-white rounded-md shadow-lg border">
                {!user ? (
                  <div className="px-4 py-2 flex justify-between items-center border-b">
                    <span className="text-gray-700 text-sm">New customer?</span>
                    <Link
                      to="/register"
                      className="text-cyan-600 text-sm font-semibold"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <ul className="text-gray-700 text-sm">
                    <Link to={"/admin/setting"} className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                      <FaUser /> My Profile
                    </Link>
                    {user.isAdmin && (
                      <Link to={"/admin"} className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                        <FaUserShield /> Admin Panel
                      </Link>
                    )}
                    <Link className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                      <FaSignOutAlt />{" "}
                      <button onClick={handleLogout}>Logout</button>
                    </Link>
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Cart LIst */}
          <Sheet open={openCart} onOpenChange={setOpenCart}>
            <SheetTrigger asChild>
              <button
                onClick={() => setOpenCart(true)}
                className="flex items-center gap-2 hover:text-cyan-600"
              >
                <FaShoppingCart /> Cart
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="text-cyan-600">Your Cart 🛒</SheetTitle>
              </SheetHeader>
              <div className="mt-4 ml-3 text-gray-700">
                <p>Your cart is empty!</p>
              </div>
            </SheetContent>
          </Sheet>

          {/* Like List  */}
           <Sheet open={openCart} onOpenChange={setOpenCart}>
            <SheetTrigger asChild>
              <button
                onClick={() => setOpenCart(true)}
                className="flex items-center gap-2 hover:text-cyan-600"
              >
                <FaHeart /> Like
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="text-cyan-600">Your Like List ❤️</SheetTitle>
              </SheetHeader>
              <div className="mt-4 ml-3 text-gray-700">
                <p>Your cart is empty!</p>
              </div>
            </SheetContent>
          </Sheet>

          {/* Become a Seller */}
          {/* <Link to="/seller" className="hover:text-cyan-600">
            Become a Seller
          </Link> */}

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
                {user && user.isAdmin && (
                  <li>
                    <Link to="/dashboard" className="block hover:text-cyan-600">
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/products" className="block hover:text-cyan-600">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/seller" className="block hover:text-cyan-600">
                    Become a Seller
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
