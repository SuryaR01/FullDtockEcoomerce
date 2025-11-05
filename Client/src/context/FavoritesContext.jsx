// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const FavoritesContext = createContext();

// export const FavoritesProvider = ({ children }) => {
//   const [favorites, setFavorites] = useState([]);

//   const token = localStorage.getItem("token");

//   // 🧠 Fetch user favorites when logged in
//   useEffect(() => {
//     if (token) {
//       axios
//         .get("http://localhost:8000/api/favorites", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((res) => setFavorites(res.data))
//         .catch(() => setFavorites([]));
//     }
//   }, [token]);

//   // const toggleFavorite = async (product) => {
//   //   try {
//   //     const exists = favorites.find((item) => item._id === product._id);
//   //     if (exists) {
//   //       await axios.delete(
//   //         `http://localhost:8000/api/favorites/remove/${product._id}`,
//   //         { headers: { Authorization: `Bearer ${token}` } }
//   //       );
//   //       setFavorites((prev) =>
//   //         prev.filter((item) => item._id !== product._id)
//   //       );
//   //     } else {
//   //       await axios.post(
//   //         "http://localhost:8000/api/favorites/add",
//   //         { productId: product._id },
//   //         { headers: { Authorization: `Bearer ${token}` } }
//   //       );
//   //       setFavorites((prev) => [...prev, product]);
//   //     }
//   //   } catch (error) {
//   //     console.error("Favorite toggle error:", error);
//   //   }
//   // };


//   // ✅ Example: toggleFavorite function
// const toggleFavorite = async (productId) => {
//   try {
//     const token = localStorage.getItem("token"); // <-- make sure this is set after login

//     const res = await axios.post(
//       "http://localhost:8000/api/favorites/add",
//       { productId },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // <-- crucial
//         },
//       }
//     );

//     console.log("Favorite toggled:", res.data);
//   } catch (err) {
//     console.error("Favorite toggle error:", err);
//   }
// };

//   return (
//     <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
//       {children}
//     </FavoritesContext.Provider>
//   );
// };

// export const useFavorites = () => useContext(FavoritesContext);






// import axios from "axios";
// import { createContext, useState } from "react";
// import toast from "react-hot-toast";

// export const FavoritesContext = createContext();

// export const FavoritesProvider = ({ children }) => {
//   const [favorites, setFavorites] = useState([]);

//   const toggleFavorite = async (productId) => {
//     try {
//       const token = localStorage.getItem("token"); // ✅ check if exists

//       if (!token) {
//         toast.error("Please login first");
//         return;
//       }

//       const res = await axios.post(
//         "http://localhost:8000/api/favorites/add",
//         { productId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // ✅ must start with Bearer
//           },
//         }
//       );

//       setFavorites(res.data.favorites || []);
//       toast.success("Favorite updated!");
//     } catch (err) {
//       console.error("Favorite toggle error:", err);
//       if (err.response?.status === 401) {
//         toast.error("Unauthorized — Please login again");
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   };

//   return (
//     <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
//       {children}
//     </FavoritesContext.Provider>
//   );
// };


// export const useFavorites = () => useContext(FavoritesContext);




// ✅ FavoritesContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
const FavoritesContext = createContext();

// Custom Hook
export const useFavorites = () => useContext(FavoritesContext);

// Provider
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Example fetch favorites (optional)
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get("http://localhost:8000/api/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(res.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);


  const toggleFavorite = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, please log in.");
        return;
      }

      const res = await axios.post(
        "http://localhost:8000/api/favorites/toggle",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Assuming the backend returns updated favorites list:
      setFavorites(res.data.favorites);
    } catch (error) {
      console.error("Favorite toggle error:", error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites , toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
