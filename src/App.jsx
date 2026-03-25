// src/App.jsx

import React from "react";
import AppRoutes from "./Routes/AppRoute";
import Navbar from "./Components/common/Navbar";
import Footer from "./Components/common/Footer";
import ScrollToTop from "./Components/common//ScrollToTop"; // ✅ import
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const location = useLocation();

  const noHeaderFooter = ["/login", "/register"];
  const hideHeaderFooter = noHeaderFooter.includes(location.pathname);

  return (

    <div className="flex flex-col min-h-screen">

      <ScrollToTop /> {/* ✅ yahan lagao */}

      {!hideHeaderFooter && <Navbar />}

      <main className="flex-1">
        <AppRoutes />
      </main>

      {!hideHeaderFooter && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

    </div>

  );

}

export default App;