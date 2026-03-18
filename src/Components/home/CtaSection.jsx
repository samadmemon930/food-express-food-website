import React from 'react'
import { Link } from 'react-router-dom'

const CtaSection = () => {
  return (
      <>
      {/* CALL TO ACTION */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-6xl mx-auto text-center px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Ready to Order Your Favorite Meal?
          </h2>
          <p className="mt-3 text-white/90">
            Fast delivery, fresh food, and amazing taste.
          </p>

          <Link
  to="/restaurant"
  className="
    inline-block mt-6 px-6 py-3 rounded-xl bg-white text-orange-600 font-medium shadow-md
    transform transition-all duration-300 ease-in-out
    
    hover:-translate-y-1 hover:shadow-xl
    active:-translate-y-1 active:shadow-xl
    focus:-translate-y-1 focus:shadow-xl
  "
>
  Order Now
</Link>
        </div>
      </section>
    </>
  )
}

export default CtaSection