// import React, { useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate, Link } from "react-router-dom";

// const Login = () => {
//   const [user, setUser] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const inputHandler = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8000/userReg/login", user);
//       toast.success(res.data.message);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       setUser({ email: "", password: "" });
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Login failed!");
//     }

//     // Example: after successful login
// const res = await axios.post("http://localhost:8000/api/auth/login", {
//   email,
//   password,
// });

// if (res.data.token) {
//   localStorage.setItem("token", res.data.token);
//   toast.success("Login successful");
//   navigate("/"); // redirect as needed
// }

//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">
//       <Toaster position="top-center" reverseOrder={false} />

//       {/* LEFT IMAGE SECTION */}
//       <div className="hidden md:flex md:w-1/2 h-full items-center justify-center">
//         <img
//           src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=2048x2048&w=is&k=20&c=_yhJ8HvUCQo9VxRUNxdVduv815OfzyEXx4pnMfUUNzI="
//           alt="Shopping Cart"
//           className="w-3/4 max-w-md object-contain drop-shadow-lg"
//         />
//       </div>

//       {/* RIGHT LOGIN FORM */}
//       <div className="w-full md:w-1/2 flex justify-center p-6 md:p-16">
//         <div className="w-full max-w-md">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">
//             Log in to <span className="text-cyan-600">Exclusive</span>
//           </h2>
//           <p className="text-gray-500 text-sm mb-8">
//             Enter your details below
//           </p>

//           <form onSubmit={submitHandler} className="space-y-6">
//             <div>
//               <input
//                 type="email"
//                 name="email"
//                 value={user.email}
//                 onChange={inputHandler}
//                 required
//                 className="w-full border-b border-gray-300 focus:border-cyan-500 focus:outline-none p-2 text-gray-800"
//                 placeholder="Email or Phone Number"
//               />
//             </div>

//             <div>
//               <input
//                 type="password"
//                 name="password"
//                 value={user.password}
//                 onChange={inputHandler}
//                 required
//                 className="w-full border-b border-gray-300 focus:border-cyan-500 focus:outline-none p-2 text-gray-800"
//                 placeholder="Password"
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <button
//                 type="submit"
//                 className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-2 rounded-md transition"
//               >
//                 Log In
//               </button>
//               <Link
//                 to="/forgot-password"
//                 className="text-sm text-cyan-600 hover:underline"
//               >
//                 Forgot Password?
//               </Link>
//             </div>
//           </form>

//           <p className="text-center text-gray-600 text-sm mt-8">
//             Don’t have an account?{" "}
//             <Link
//               to="/register"
//               className="text-cyan-600 font-semibold hover:underline"
//             >
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:7000/api/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      // store access token
      localStorage.setItem("accessToken", res.data.accessToken);
      toast.success("Login successful!");

      // clear form and navigate
      setForm({ username: "", password: "" });
      navigate("/protected");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">
      <Toaster position="top-center" reverseOrder={false} />

      {/* LEFT IMAGE SECTION */}
      <div className="hidden md:flex md:w-1/2 h-full items-center justify-center">
        <img
          src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=2048x2048&w=is&k=20&c=_yhJ8HvUCQo9VxRUNxdVduv815OfzyEXx4pnMfUUNzI="
          alt="Login Illustration"
          className="w-3/4 max-w-md object-contain drop-shadow-lg"
        />
      </div>

      {/* RIGHT LOGIN FORM */}
      <div className="w-full md:w-1/2 flex justify-center p-6 md:p-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Log in to <span className="text-cyan-600">Exclusive</span>
          </h2>
          <p className="text-gray-500 text-sm mb-8">Enter your details below</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 focus:border-cyan-500 focus:outline-none p-2 text-gray-800"
                placeholder="Username"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 focus:border-cyan-500 focus:outline-none p-2 text-gray-800"
                placeholder="Password"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-2 rounded-md transition"
              >
                Log In
              </button>
              <Link
                to="/forgot-password"
                className="text-sm text-cyan-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </form>

          <p className="text-center text-gray-600 text-sm mt-8">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-cyan-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
