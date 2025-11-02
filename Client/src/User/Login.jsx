  import React, { useState } from "react";
  import axios from "axios";
  import toast, { Toaster } from "react-hot-toast";
  import { useNavigate, Link } from "react-router-dom";

  const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const inputHandler = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };

    // const submitHandler = async (e) => {
    //   e.preventDefault();
    //   try {
    //     const res = await axios.post("http://localhost:8000/userReg/register  ", user);
    //     toast.success(res.data.message);
    //     setUser({ email: "", password: "" });
    //     navigate("/dashboard"); // ✅ navigate to dashboard or home page
    //   } catch (err) {
    //     console.error(err);
    //     toast.error(err.response?.data?.message || "Login failed!");
    //   }
    // };


    const submitHandler = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:8000/userReg/login", user);

    toast.success(res.data.message);

    // Store user info in localStorage
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setUser({ email: "", password: "" });

    // Redirect based on admin or normal user
    if (res.data.user.isAdmin) {
      navigate("/");
    } else {
      navigate("/");
    }
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Login failed!");
  }
};


    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-cyan-200">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[400px]">
          <h2 className="text-3xl font-bold text-center text-cyan-600 mb-6">
            Welcome Back 👋
          </h2>

          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-cyan-700 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
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
                value={user.password}
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
              Login
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don’t have an account?{" "}
              <Link to="/register" className="text-cyan-600 font-semibold">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  };

  export default Login;
