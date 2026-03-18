// src/pages/Restaurant.jsx
import React from "react";

const Restaurant = () => {
  // Dummy menu items
  const menuItems = [
    { id: 1, name: "Margherita Pizza", price: 10, description: "Classic cheese & tomato" },
    { id: 2, name: "Pepperoni Pizza", price: 12, description: "Spicy pepperoni & cheese" },
    { id: 3, name: "Veggie Pizza", price: 11, description: "Onions, peppers, mushrooms" },
    { id: 4, name: "BBQ Chicken Pizza", price: 13, description: "Grilled chicken & BBQ sauce" },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      {/* Hero Section */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-2">Restaurant Menu</h1>
        <p className="text-gray-600">Choose your favorite dishes and enjoy!</p>
      </section>

      {/* Menu Items */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
            <p className="text-gray-500 mb-2">{item.description}</p>
            <p className="font-bold">${item.price}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Restaurant;