


import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default role
  });

  const navigate = useNavigate();

  // Handle input change
  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // ✅ Allow only one specific admin
      const ADMIN_EMAIL = "surya@treaders.com"; 
      const ADMIN_PASSWORD = "password@2002";

      if (user.role === "admin") {
        if (user.email !== ADMIN_EMAIL || user.password !== ADMIN_PASSWORD) {
          toast.error("Invalid admin credentials!");
          return;
        }

        // toast.success("Admin login successful!");

        localStorage.setItem(
          "user",
          JSON.stringify({
            username: "Admin",
            email: ADMIN_EMAIL,
            role: "admin",
          })
        );

        setTimeout(() => navigate("/admin"), 1200);
        return;
      }

      // ✅ For inducer and normal user → send request to backend
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        username: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      });

      toast.success(res.data.message || "Login successful!");

      localStorage.setItem(
        "user",
        JSON.stringify({
          username: user.name || res.data.username || "Guest",
          email: user.email,
          role: user.role,
          token: res.data.token,
        })
      );

      // ✅ Redirect based on role
      setTimeout(() => {
        if (user.role === "inducer") navigate("/");
        else navigate("/admin");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">
      <Toaster position="top-center" reverseOrder={false} />

      {/* LEFT IMAGE */}
      <div className="hidden md:flex md:w-1/2 h-screen items-center justify-center">
        <img
          src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=2048x2048&w=is&k=20&c=_yhJ8HvUCQo9VxRUNxdVduv815OfzyEXx4pnMfUUNzI="
          alt="Login Illustration"
          className="w-full h-[60%] object-contain"
        />
      </div>

      {/* RIGHT LOGIN FORM */}
      <div className="w-full md:w-1/2 flex justify-center p-6 md:p-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome <span className="text-cyan-600">Back</span>
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Enter your credentials to access your account
          </p>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Username */}
            <div>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={inputHandler}
                required
                className="w-full border-b border-gray-300 focus:border-cyan-500 focus:outline-none p-2 text-gray-800"
                placeholder="Username"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={inputHandler}
                required
                className="w-full border-b border-gray-300 focus:border-cyan-500 focus:outline-none p-2 text-gray-800"
                placeholder="Email Address"
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={inputHandler}
                required
                className="w-full border-b border-gray-300 focus:border-cyan-500 focus:outline-none p-2 text-gray-800"
                placeholder="Password"
              />
            </div>

            {/* Role Selector */}
            <div>
              <select
                name="role"
                value={user.role}
                onChange={inputHandler}
                className="w-full border-b border-gray-300 focus:border-cyan-500 focus:outline-none p-2 text-gray-800 bg-transparent"
              >
                <option value="user">User</option>
                <option value="inducer">Inducer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Submit + Link */}
            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-2 rounded-md transition"
              >
                Login
              </button>

              <Link
                to="/register"
                className="text-sm text-cyan-600 hover:underline"
              >
                Don’t have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
