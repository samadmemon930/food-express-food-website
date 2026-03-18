import React from 'react'
import { Link } from 'react-router-dom'

const FeaturedRestaurant = () => {
  return (
    <>
    {/* FEATURED RESTAURANTS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
            Featured Restaurants
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {[
              {
                name: "Burger Palace",
                img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
                category: "Burgers • Fast Food"
              },
              {
                name: "Italiano Pizza",
                img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
                category: "Pizza • Pasta"
              },
              {
                name: "Spice Hub",
                img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80",
                category: "Desi • BBQ"
              }
            ].map((restaurant, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={restaurant.img}
                  alt={restaurant.name}
                  className="h-52 w-full object-cover transition duration-500 cursor-pointer hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {restaurant.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {restaurant.category}
                  </p>

                  <Link
                    to="/restaurant"
                    className="inline-block mt-4 text-orange-600 font-medium hover:underline"
                  >
                    View Menu →
                  </Link>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
</>
  )
}



export default FeaturedRestaurant