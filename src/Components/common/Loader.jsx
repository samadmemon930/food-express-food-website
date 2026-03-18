// src/components/common/Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      {/* Loading Text */}
      <p className="text-orange-500 text-lg font-medium">Please wait...</p>
    </div>
  );
};

export default Loader;