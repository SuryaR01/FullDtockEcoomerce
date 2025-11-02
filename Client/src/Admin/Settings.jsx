import React, { useState } from "react";
import { FaUserCog, FaBell, FaLock, FaStore } from "react-icons/fa";
import { MdOutlineSave } from "react-icons/md";
import toast from "react-hot-toast";

const Settings = () => {
  const [formData, setFormData] = useState({
    adminName: "Admin User",
    email: "admin@example.com",
    shopName: "MyShop",
    currency: "INR ₹",
    theme: "light",
    notifications: true,
    twoFactorAuth: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Settings updated successfully!");
    console.log("Updated settings:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 flex items-center gap-3">
        <FaUserCog className="text-cyan-500" /> Admin Settings
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-lg max-w-5xl mx-auto border border-gray-100"
      >
        {/* ===== Admin Profile ===== */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
            <FaUserCog className="text-cyan-500" /> Profile Settings
          </h2>

          <input
            type="text"
            name="adminName"
            value={formData.adminName}
            onChange={handleChange}
            placeholder="Admin Name"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Admin Email"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
        </div>

        {/* ===== Store Settings ===== */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
            <FaStore className="text-cyan-500" /> Store Configuration
          </h2>

          <input
            type="text"
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            placeholder="Store Name"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
          />

          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
          >
            <option value="INR ₹">INR ₹</option>
            <option value="USD $">USD $</option>
            <option value="EUR €">EUR €</option>
          </select>

          <select
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
          >
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
          </select>
        </div>

        {/* ===== Security Settings ===== */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
            <FaLock className="text-cyan-500" /> Security
          </h2>

          <div className="flex items-center justify-between border rounded-lg px-4 py-2">
            <label htmlFor="twoFactorAuth" className="text-gray-700">
              Enable Two-Factor Authentication
            </label>
            <input
              id="twoFactorAuth"
              name="twoFactorAuth"
              type="checkbox"
              checked={formData.twoFactorAuth}
              onChange={handleChange}
              className="h-5 w-5 accent-cyan-500"
            />
          </div>
        </div>

        {/* ===== Notifications ===== */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
            <FaBell className="text-cyan-500" /> Notifications
          </h2>

          <div className="flex items-center justify-between border rounded-lg px-4 py-2">
            <label htmlFor="notifications" className="text-gray-700">
              Email Notifications
            </label>
            <input
              id="notifications"
              name="notifications"
              type="checkbox"
              checked={formData.notifications}
              onChange={handleChange}
              className="h-5 w-5 accent-cyan-500"
            />
          </div>
        </div>

        {/* ===== Submit Button ===== */}
        <div className="col-span-2 flex justify-end mt-6">
          <button
            type="submit"
            className="flex items-center gap-2 bg-cyan-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-cyan-600 transition-all"
          >
            <MdOutlineSave className="text-lg" /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
