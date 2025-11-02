
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    conformPassword : ""
  });

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/userReg/register", user);
      toast.success(res.data.message);
      setUser({ name: "", email: "", password: "" , conformPassword : ""});
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-cyan-200">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white/90 p-8 rounded-2xl shadow-xl w-[400px]">
        <h2 className="text-3xl font-bold text-center text-cyan-600 mb-6">
          Create Account
        </h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-cyan-700 font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name || ""}
              onChange={inputHandler}
              required
              className="w-full p-3 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-cyan-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={inputHandler}
              required
              className="w-full p-3 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-cyan-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password || ""}
              onChange={inputHandler}
              required
              className="w-full p-3 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Enter password"
            />
          </div>


          <div>
            <label className="block text-cyan-700 font-semibold mb-1">
              ConForm Password
            </label>
            <input
              type="password"
              name="conformPassword"
              value={user.conformPassword || ""} 
              onChange={inputHandler}
              required
              className="w-full p-3 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
