import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../Services/AuthService";
import Swal from "sweetalert2";
import { Mail, Lock } from "lucide-react";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      Swal.fire({
             icon: "error",
             title: "All fields are required",
             text: "Please fill in all fields before continuing.",
             confirmButtonColor: "#e74c3c",
             customClass: {
               title: "swal-title-small",
               htmlContainer: "swal-text-small"
             }
           });
           return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        confirmButtonColor: "#e74c3c",
        customClass: {
          title: "swal-title-small",
          htmlContainer: "swal-text-small"
        }
      });
      return;
    }

    try {
      await loginUser(email, password);

      const result = await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back!",
        confirmButtonColor: "#f97316",
        confirmButtonText: "Continue",
        customClass: {
          title: "swal-title-small",
          htmlContainer: "swal-text-small"
        }
      });

      if (result.isConfirmed) {
        navigate("/");
      }

    } catch (err) {

      if (err.code === "auth/user-not-found") {
        Swal.fire({
          icon: "error",
          title: "Email does not match",
          text: "No account found with this email.",
          confirmButtonColor: "#e74c3c",
          customClass: {
            title: "swal-title-small",
            htmlContainer: "swal-text-small"
          }
        });

      } else if (err.code === "auth/wrong-password") {

        Swal.fire({
          icon: "error",
          title: "Password does not match",
          text: "Please check your password.",
          confirmButtonColor: "#e74c3c",
          customClass: {
            title: "swal-title-small",
            htmlContainer: "swal-text-small"
          }
        });

      } else {

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password.",
          confirmButtonColor: "#e74c3c",
          customClass: {
            title: "swal-title-small",
            htmlContainer: "swal-text-small"
          }
        });

      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 px-4 md:px-6">

      {/* Logo */}
      <Link
        to="/"
        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4"
      >
        FoodExpress
      </Link>

      {/* Card */}
      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-md p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-100"
      >

        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-5 text-center">
          Login
        </h2>

        {/* Email */}
        <div className="relative mb-5">

          <Mail
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Email"
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        {/* Password */}
        <div className="relative mb-6">

          <Lock
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-2 bg-gradient-to-r from-orange-500 to-red-500 text-lg text-white py-3 rounded-lg font-medium cursor-pointer hover:scale-105 active:scale-95 transition"
        >
          Login
        </button>

        {/* Register */}
        <p className="mt-5 text-center text-gray-600 text-sm md:text-base">

          Don't have an account?

          <Link
            to="/register"
            className="text-orange-500 font-semibold hover:underline ml-1"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
};

export default Login;