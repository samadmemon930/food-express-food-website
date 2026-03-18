import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import Swal from "sweetalert2";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // total cart quantity
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const links = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/restaurant" },
    { name: "Orders", path: "/orders" },
  ];

  ////////////////////////////////////////
  // ✅ CONFIRM LOGOUT
  ////////////////////////////////////////
  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await logout();
        navigate("/"); // redirect to home
      }
    });
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md border-b border-gray-100">

      <div className="max-w-6xl mx-auto px-4 md:px-6">

        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent cursor-pointer"
          >
            FoodExpress
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="nav-link text-gray-700 font-medium hover:text-orange-600 transition duration-200 cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">

            {/* CART */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center h-10 w-10 rounded-md hover:bg-gray-100 transition cursor-pointer"
            >
              <svg
                className="w-7 h-7 text-gray-700 hover:text-orange-600 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1 5h12m-6-5v5"
                />
              </svg>

              {/* CART BADGE */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-[2px] rounded-full font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* AUTH BUTTON */}
            <div className="hidden md:flex">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium shadow hover:scale-105 transition cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium shadow hover:scale-105 transition cursor-pointer"
                >
                  Login
                </Link>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden h-10 w-10 flex items-center justify-center cursor-pointer"
            >
              <svg
                className="w-7 h-7 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>

          </div>

        </div>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">

            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="nav-link block text-gray-700 hover:text-orange-600 font-medium cursor-pointer"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <button
                onClick={handleLogout}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block text-center py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium cursor-pointer"
              >
                Login
              </Link>
            )}

          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;