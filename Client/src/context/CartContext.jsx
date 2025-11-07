


import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  const [user, setUser] = useState(null);

  console.log(cart, "🛒 Cart list");

  // ✅ Load user from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch {
      setUser(null);
    }
  }, []);

  // ✅ Fetch all cart items for logged-in user
  const fetchCart = async (username) => {
    if (!username) return;
    try {
      const res = await axios.get(`http://localhost:8000/api/cart/${username}`);
      const carts = res.data?.cart || [];
      console.log("✅ Loaded cart items:", carts);
      setCart(carts);
    } catch (err) {
      console.error("❌ Fetch cart failed:", err);
      setCart([]);
    }
  };

  // ✅ Fetch cart when user logs in or reloads
  useEffect(() => {
    if (user?.username || user?.userName || user?.userEmail) {
      const username =
        user.username || user.userName || user.name || user.userEmail;
      fetchCart(username);
    }
  }, [user]);

  // ✅ Add or remove from cart
  const toggleCart = async (product) => {
    const username =
      user?.username || user?.userName || user?.name || user?.userEmail;

    if (!username) {
      toast.error("Please log in first!");
      return;
    }

    const productId = product._id || product.id;
    const exists = cart.find((item) => item.product?._id === productId);

    try {
      if (exists) {
        // ✅ Remove item from cart
        await axios.post("http://localhost:8000/api/cart/remove", {
          username,
          productId,
        });
        setCart((prev) =>
          prev.filter((item) => item.product?._id !== productId)
        );
        toast.success("Removed from cart 🛒");
      } else {
        // ✅ Add item to cart
        const res = await axios.post("http://localhost:8000/api/cart/add", {
          username,
          product: {
            _id: productId,
            name: product.name,
            price: product.price,
            category: product.category,
            description: product.description,
            image: product.image,
            stock: product.stock,
          },
        });

        // ✅ Handle if backend returns updated cart array or single item
        const updatedCart =
          Array.isArray(res.data?.cart) && res.data.cart.length > 0
            ? res.data.cart
            : [...cart, res.data.cart];

        setCart(updatedCart);
        toast.success("Added to cart 🛍️");
      }
    } catch (err) {
      console.error("❌ Cart API Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <CartContext.Provider value={{ cart, toggleCart, fetchCart , setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

