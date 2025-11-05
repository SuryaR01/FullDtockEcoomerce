import React, { useEffect, useState } from "react";
import api from "../Api/axios";
import toast from "react-hot-toast";

const Protected = () => {
  const [user, setUser] = useState(null);

  const fetchProtected = async () => {
    try {
      const res = await api.get("/protected");
      setUser(res.data.user);
    } catch (err) {
      // If token expired, try refresh
      if (err.response?.status === 403) {
        try {
          const refresh = await api.post("/refresh");
          localStorage.setItem("accessToken", refresh.data.accessToken);
          const res2 = await api.get("/protected");
          setUser(res2.data.user);
        } catch {
          toast.error("Session expired, please login again");
          localStorage.removeItem("accessToken");
          window.location = "/login";
        }
      } else {
        toast.error("Failed to fetch data");
      }
    }
  };

  useEffect(() => {
    fetchProtected();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      {user ? (
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl mb-2 font-semibold">Welcome, {user.username}</h2>
          <p>User ID: {user.id}</p>
          <button
            onClick={async () => {
              await api.post("/logout");
              localStorage.removeItem("accessToken");
              toast.success("Logged out");
              window.location = "/login";
            }}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Protected;
