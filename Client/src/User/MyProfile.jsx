

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserEdit, FaEnvelope, FaCalendarAlt, FaUser } from "react-icons/fa";

const MyProfile = () => {
  const [user, setUser] = useState(null);

  // ✅ Fetch user details from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 text-lg"
        >
          No user data found. Please log in.
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-purple-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white shadow-2xl rounded-3xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-200 p-6 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-white flex items-center justify-center shadow-lg">
            <FaUser className="text-cyan-600 text-5xl" />
          </div>
          <h2 className="text-2xl font-semibold text-white mt-3">
            {user.username || "Unnamed User"}
          </h2>
          <p className="text-cyan-100">My Profile</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 border-b pb-3"
          >
            <FaEnvelope className="text-cyan-500 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{user.email}</p>
            </div>
          </motion.div>

          {user.createdAt && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 border-b pb-3"
            >
              <FaCalendarAlt className="text-cyan-500 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Joined On</p>
                <p className="font-medium text-gray-800">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          )}

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3"
          >
            <FaUserEdit className="text-cyan-500 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium text-green-600">Active</p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center">
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full shadow-md transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default MyProfile;
