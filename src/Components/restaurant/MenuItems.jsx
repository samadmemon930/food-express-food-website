import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../../hooks/useCart";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../Services/FirebaseConfig";

const MenuItems = ({ search = "" }) => {
  const { addToCart } = useCart();
  const [items, setItems] = useState([]);

  useEffect(() => {

    const q = query(
      collection(db, "items"),
      orderBy("createdAt", "asc")
    );

    // ⭐ Realtime Firestore listener
    const unsubscribe = onSnapshot(q, (snapshot) => {

      const itemsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setItems(itemsData);

    });

    // cleanup listener
    return () => unsubscribe();

  }, []);

  const handleAdd = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart 🛒`);
  };

  // Search filter
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-10 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
          Our Menu
        </h2>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="menu-card group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="menu-image h-52 w-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    ${item.price}
                  </p>

                  <button
                    onClick={() => handleAdd(item)}
                    className="menu-btn mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium shadow-md cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg col-span-full text-gray-500">
              No Results Found
            </p>
          )}
        </div>

      </div>
    </section>
  );
};

export default MenuItems;