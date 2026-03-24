import React, { useEffect, useState } from "react";
import { subscribeUserOrders } from "../Services/OrderService";
import { useAuth } from "../hooks/useAuth";

const Orders = () => {

  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!user?.uid) return;

    const unsubscribe = subscribeUserOrders(user.uid, (data) => {
      setOrders(data);
      setLoading(false);
    });

    return () => unsubscribe();

  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center mt-32 text-lg font-semibold">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-20">

      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (

        <p className="text-gray-500">
          No orders yet
        </p>

      ) : (

        orders.map((order) => (

          <div
            key={order.id}
            className="border p-6 rounded-xl mb-6 shadow-sm"
          >

            <p className="font-semibold mb-2">
              Order ID: {order.id}
            </p>

            <p className="text-gray-600">
              Status:
              <span
                className={`ml-2 font-medium px-2 py-1 rounded text-white
                  ${order.status === "pending" && "bg-yellow-500"}
                  ${order.status === "preparing" && "bg-blue-500"}
                  ${order.status === "delivered" && "bg-green-500"}
                `}
              >
                {order.status}
              </span>
            </p>

            <p className="text-gray-600 mb-2">
              Payment: {order.paymentMethod}
            </p>

            <p className="text-gray-600 mb-4">
              Total: ${order.total}
            </p>

            {/* Items */}
            {order.items.map((item, index) => (

              <div
                key={index}
                className="flex items-center gap-4 border-t pt-3 mt-3"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div>

                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Price: ${item.price}
                  </p>

                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>

                </div>

              </div>

            ))}

          </div>

        ))

      )}

    </div>
  );
};

export default Orders;