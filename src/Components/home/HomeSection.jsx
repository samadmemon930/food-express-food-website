import React from "react";
import { Link } from "react-router-dom";

const HomeSection = () => {
  return (
   
<>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-36 pb-16 md:pb-24 flex flex-col lg:flex-row items-center justify-between gap-10">
          
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-800">
              Delicious Food Delivered
              <span className="block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Straight To Your Door
              </span>
            </h1>

            <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0">
              Order from your favorite restaurants and enjoy fresh meals anytime, anywhere.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/restaurant"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-95"
              >
                Explore Menu
              </Link>

              <Link
                to="/orders"
                className="px-6 py-3 rounded-lg border border-orange-500 text-orange-600 font-medium transition-all duration-300 hover:bg-orange-100 hover:-translate-y-1 active:scale-95"
              >
                View Orders
              </Link>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
              alt="Food"
              className="rounded-2xl shadow-xl w-full max-w-md object-cover "
            />
          </div>
        </div>
      </section>
      </>
  );
};
 
export default HomeSection;
