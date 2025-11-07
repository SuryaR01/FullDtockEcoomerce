import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Error = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      {/* Breadcrumb */}
      <div className="absolute top-8 left-6 text-sm text-gray-500">
       <Link to={"/"}> Home </Link> / <span className="text-cyan-600 font-medium">404 Error</span>
      </div>

      {/* Error Text */}
      <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
        404 Not Found
      </h1>

      {/* Sub Text */}
      <p className="text-gray-600 text-sm md:text-base mb-8">
        Your visited page was not found. You may go back to the home page.
      </p>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-cyan-600 text-white font-medium px-6 py-3 rounded-md hover:bg-cyan-700 transition duration-200"
      >
        Back to home page
      </button>
    </section>
  );
};

export default Error;
