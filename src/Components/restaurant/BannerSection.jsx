import React from "react";

const BannerSection = () => {
  return (
    <section className="relative h-[350px] md:h-[420px] w-full overflow-hidden">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80"
        alt="Restaurant Banner"
        className="absolute w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Restaurant
        </h1>

        <p className="mt-3 text-sm md:text-base max-w-xl">
          Discover delicious meals made with fresh ingredients and authentic flavors.
        </p>
      </div>

    </section>
  );
};

export default BannerSection;