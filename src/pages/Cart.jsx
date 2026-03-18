import { useCart } from "../hooks/useCart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const { cartItems, loading, increaseQty, decreaseQty, deleteItem, clearCart } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-32 text-lg font-semibold">
        Loading your cart...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 pt-24 pb-16">

      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
            alt="empty cart"
            className="w-44 mb-6 opacity-90"
          />

          <h3 className="text-2xl font-semibold text-gray-800">
            Your cart feels lonely
          </h3>

          <p className="text-gray-500 mt-2 max-w-sm">
            Looks like you haven't added any delicious food yet.
            Explore our menu and fill your cart with tasty meals.
          </p>

          <button
            onClick={() => navigate("/restaurant")}
            className="mt-6 px-7 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium shadow-lg hover:scale-105 active:scale-105 hover:shadow-xl active:shadow-xl transition cursor-pointer"
          >
            Browse Menu
          </button>
        </div>
      ) : (

        <div className="space-y-5">

          {cartItems.map((item) => (

            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border rounded-xl p-3 shadow-sm hover:shadow-lg active:shadow-lg transition"
            >

              {/* Item info */}
              <div className="flex items-center gap-4 w-full sm:w-auto">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-md cursor-pointer"
                />

                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    ${item.price}
                  </p>
                </div>

              </div>

              {/* Quantity & Delete */}
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">

                {/* Quantity Control */}
                <div className="flex items-center rounded-lg overflow-hidden border border-gray-300 shadow-sm">

                  <button
                    disabled={item.quantity === 1}
                    onClick={() => decreaseQty(item)}
                    className={`w-10 h-10 flex items-center justify-center transition 
                    ${item.quantity === 1
                        ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                        : "bg-white hover:bg-orange-50 hover:text-orange-500 active:bg-orange-50 active:text-orange-500 border-r border-gray-300 cursor-pointer"
                      }`}
                  >
                    −
                  </button>

                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item)}
                    className="w-10 h-10 flex items-center justify-center bg-white hover:bg-orange-50 active:bg-orange-50 hover:text-orange-500 active:text-orange-500 border-l border-gray-300 transition cursor-pointer"
                  >
                    +
                  </button>

                </div>

                {/* Delete Icon */}
                <button
                  onClick={() => {
                    deleteItem(item.id);
                    toast.error("Item removed from cart");
                  }}
                  className="p-2 rounded-full hover:bg-red-100 active:bg-red-100 transition cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

              </div>

            </div>

          ))}

          {/* Cart Summary */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-6 bg-gray-100 p-6 rounded-xl shadow-md">

            <h3 className="text-2xl font-bold text-gray-800">
              Total: ${total.toFixed(2)}
            </h3>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">

              <button
                onClick={() => {
                  clearCart();
                  toast.info("Cart cleared");
                }}
                className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-700 active:bg-gray-700 transition cursor-pointer"
              >
                Clear Cart
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full sm:w-auto px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 active:bg-green-600 transition cursor-pointer"
              >
                Checkout
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Cart;