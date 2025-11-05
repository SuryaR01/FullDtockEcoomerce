// import React, { useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { Link, useNavigate } from "react-router-dom";

// const Register = () => {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//     conformPassword: "",
//   });

//   const navigate = useNavigate();

//   const inputHandler = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       if (user.password !== user.conformPassword) {
//         toast.error("Passwords do not match!");
//         return;
//       }

//       const res = await axios.post("http://localhost:7000/api/auth/register", {
//   username,
//   email,
//   password
// });
//       toast.success(res.data.message);

//       setUser({ name: "", email: "", password: "", conformPassword: "" });

//       setTimeout(() => navigate("/userlogin"), 1500);
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Registration failed!");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">
//       <Toaster position="top-center" reverseOrder={false} />

//       {/* LEFT IMAGE SECTION */}
//       <div className="hidden md:flex md:w-1/2 h-screen items-center justify-center ">
//   <img
//     src="https://www.searchenginejournal.com/wp-content/uploads/2020/03/20-free-things-you-need-to-do-after-launching-your-ecommerce-website-5e664bcb60da5.png"
//     alt="Shopping Cart"
//     className="w-full h-[60%] object-cover  ml-50"
//   />
// </div>

//       {/* RIGHT REGISTER FORM */}
//       <div className="w-full md:w-1/2 flex justify-center p-6 md:p-16">
//         <div className="w-full max-w-md">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">
//             Create <span className="text-cyan-600">Account</span>
//           </h2>
//           <p className="text-gray-500 text-sm mb-8">
//             Enter your details below to sign up
//           </p>

//           <form onSubmit={submitHandler} className="space-y-6">
//             <div>
//               <input
//                 type="text"
//                 name="name"
//                 value={user.name}
//                 onChange={inputHandler}
//                 required
//                 className="w-full border-b border-gray-300 focus:border-cyan-500 focus:outline-none p-2 text-gray-800"
//                 placeholder="Full Name"
//               />
//             </div>

//             <div>
//               <input
//                 type="email"
//                 name="email"
//                 value={user.email}
//                 onChange={inputHandler}
//                 required
//                 className="w-full border-b border-gray-300 focus:border-cyan-500 focus:outline-none p-2 text-gray-800"
//                 placeholder="Email Address"
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

//             <div>
//               <input
//                 type="password"
//                 name="conformPassword"
//                 value={user.conformPassword}
//                 onChange={inputHandler}
//                 required
//                 className="w-full border-b border-gray-300 focus:border-cyan-500 focus:outline-none p-2 text-gray-800"
//                 placeholder="Confirm Password"
//               />
//             </div>

//             <div className="flex items-center justify-between mt-6">
//               <button
//                 type="submit"
//                 className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-2 rounded-md transition"
//               >
//                 Register
//               </button>

//               <Link to="/userlogin" className="text-sm text-cyan-600 hover:underline">
//                 Already have an account?
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    conformPassword: "",
  });

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (user.password !== user.conformPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      // ✅ Corrected payload: use user.name instead of undefined username
      const res = await axios.post("http://localhost:8000/api/auth/register", {
        username: user.name,
        email: user.email,
        password: user.password,
        conformPassword: user.conformPassword,
      });

      toast.success(res.data.message || "Registered successfully!");

      // Reset form
      setUser({ name: "", email: "", password: "", conformPassword: "" });

      // Redirect after short delay
      setTimeout(() => navigate("/userlogin"), 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">
      <Toaster position="top-center" reverseOrder={false} />

      {/* LEFT IMAGE SECTION */}
      <div className="hidden md:flex md:w-1/2 h-screen items-center justify-center">
        <img
          src="https://www.searchenginejournal.com/wp-content/uploads/2020/03/20-free-things-you-need-to-do-after-launching-your-ecommerce-website-5e664bcb60da5.png"
          alt="Shopping Cart"
          className="w-full h-[60%] object-cover ml-50"
        />
      </div>

      {/* RIGHT REGISTER FORM */}
      <div className="w-full md:w-1/2 flex justify-center p-6 md:p-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create <span className="text-cyan-600">Account</span>
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Enter your details below to sign up
          </p>

          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                value={user.username}
                onChange={inputHandler}
                required
                className="w-full border-b border-gray-300 focus:border-cyan-500 focus:outline-none p-2 text-gray-800"
                placeholder="Full Name"
              />
            </div>

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

            <div>
              <input
                type="password"
                name="conformPassword"
                value={user.conformPassword}
                onChange={inputHandler}
                required
                className="w-full border-b border-gray-300 focus:border-cyan-500 focus:outline-none p-2 text-gray-800"
                placeholder="Confirm Password"
              />
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-2 rounded-md transition"
              >
                Register
              </button>

              <Link
                to="/userlogin"
                className="text-sm text-cyan-600 hover:underline"
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
