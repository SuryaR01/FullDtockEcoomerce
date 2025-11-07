
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  // ✅ Load user safely from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (
        storedUser &&
        storedUser !== "undefined" &&
        storedUser !== "null" &&
        storedUser.trim() !== ""
      ) {
        const parsed = JSON.parse(storedUser);
        console.log("✅ Loaded user from localStorage:", parsed);
        setUser(parsed);
      } else {
        setUser(null);
      }
    } catch (err) { 
      console.error("❌ Error parsing user from localStorage:", err);
      localStorage.removeItem("user");
      setUser(null);
    }
  }, []);

  // ✅ Fetch all favorites for logged-in user
  const fetchFavorites = async (username) => {
    if (!username) return;
    try {
      const res = await axios.get(
        `http://localhost:8000/api/favorites/${username}`
      );

      const favs = res.data?.favorites || [];
      console.log("✅ Loaded favorites:", favs);
      setFavorites(favs);
    } catch (err) {
      console.error("❌ Fetch favorites failed:", err);
      setFavorites([]);
    }
  };

  // Fetch favorites on user load
  useEffect(() => {
    if (user?.username || user?.userName || user?.userEmail) {
      const username =
        user.username || user.userName || user.name || user.userEmail;
      fetchFavorites(username);
    }
  }, [user]);

  // ✅ Toggle favorite (add/remove) using username + product snapshot
  const toggleFavorite = async (product) => {
    const username =
      user?.username || user?.userName || user?.name || user?.userEmail;

    if (!username) {
      toast.error("Please log in to manage favorites!");
      return;
    }

    const productId = product._id || product.id;
    const exists = favorites.find(
      (fav) => fav.product && fav.product._id === productId
    );

    try {
      if (exists) {
        // 🗑 Remove from favorites
        await axios.post("http://localhost:8000/api/favorites/remove", {
          username,
          productId,
        });

        setFavorites((prev) =>
          prev.filter((fav) => fav.product._id !== productId)
        );
        toast.success("Removed from favorites ❤️");
      } else {
        // 💖 Add to favorites (send full product details)
        const res = await axios.post("http://localhost:8000/api/favorites/add", {
          username,
          productId: product._id,
          name: product.name,
          price: product.price,
          category: product.category,
          description: product.description,
          image: product.image,
          stock: product.stock,
        });

        setFavorites((prev) => [...prev, res.data.fav]);
        toast.success("Added to favorites 💖");
      }
    } catch (err) {
      console.error("❌ Favorite API Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

//   const toggleFavorite = async (product) => {
//   const username =
//     user?.username || user?.userName || user?.name || user?.userEmail;

//   if (!username) {
//     toast.error("Please log in to manage favorites!");
//     return;
//   }

//   // ✅ Ensure valid productId (fallback)
//   const productId = product._id || product?.id;
//   if (!productId) {
//     console.error("❌ Missing productId in product:", product);
//     toast.error("Invalid product data. Please try again.");
//     return;
//   }

//   const exists = favorites.find(
//     (fav) => fav.product && fav.product._id === productId
//   );

//   try {
//     if (exists) {
//       // 🗑 Remove from favorites
//       await axios.post("http://localhost:8000/api/favorites/remove", {
//         username,
//         productId,
//       });

//       setFavorites((prev) =>
//         prev.filter((fav) => fav.product._id !== productId)
//       );
//       toast.success("Removed from favorites ❤️");
//     } else {
//       // ✅ Add to favorites (include all product fields)
//       const res = await axios.post("http://localhost:8000/api/favorites/add", {
//         username,
//         productId, // now guaranteed
//         name: product.name,
//         price: product.price,
//         category: product.category,
//         description: product.description,
//         image: product.image,
//         stock: product.stock,
//       });

//       setFavorites((prev) => [...prev, res.data.fav]);
//       toast.success("Added to favorites 💖");
//     }
//   } catch (err) {
//     console.error("❌ Favorite API Error:", err.response?.data || err.message);
//     toast.error(err.response?.data?.message || "Something went wrong!");
//   }
// };


  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, fetchFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
