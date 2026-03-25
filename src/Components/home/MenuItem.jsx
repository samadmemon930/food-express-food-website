import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../../hooks/useCart";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../Services/FirebaseConfig";
import { useNavigate } from "react-router-dom";

const MenuItems = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [dishes, setDishes] = useState([]);

  useEffect(() => {

    const q = query(
      collection(db, "dishes"),
      orderBy("createdAt", "asc")
    );

    // ⭐ Realtime Firestore listener
    const unsubscribe = onSnapshot(q, (snapshot) => {

      const dishesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDishes(dishesData);

    });

    // cleanup
    return () => unsubscribe();

  }, []);

  const handleAdd = (dish) => {
    addToCart(dish);
    toast.success(`${dish.name} added to cart 🛒`);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
          Popular Dishes
        </h2>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="menu-card group bg-white rounded-2xl cursor-pointer overflow-hidden border border-gray-100 shadow-md"
            >
              <div className="relative overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="menu-image h-52 w-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                  {dish.name}
                </h3>

                <p className="text-md text-gray-500 mt-1">
                  ${dish.price}
                </p>

                <button
                  onClick={() => handleAdd(dish)}
                  className="menu-btn mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium cursor-pointer shadow-md hover:opacity-90 transition"
                >
                  Add to Cart
                </button>
              </div>

            </div>
          ))}

        </div>


        <div className="flex justify-center mt-14">
          <button
  onClick={() => {
    navigate("/restaurant");
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }}
  className="
    px-8 py-3 rounded-xl border border-orange-500 text-orange-500 font-medium 
    transform transition-all duration-300 cursor-pointer

    hover:scale-110 hover:bg-orange-500 hover:text-white hover:shadow-lg
    active:scale-95 active:bg-orange-500 active:text-white active:shadow-lg
    focus:bg-orange-500 focus:text-white focus:shadow-lg

    sm:hover:scale-110 sm:active:scale-95
  "
>
  View All Restaurants
</button>
        </div>
      </div>
    </section>
  );
};

export default MenuItems;