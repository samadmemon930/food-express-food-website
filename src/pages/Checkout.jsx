import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { placeOrder } from "../Services/OrderService";
import { serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {

  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleOrder = async () => {

    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill all fields");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select payment method");
      return;
    }

    const order = {
      userId: user?.uid,
      items: cartItems,
      total: total,
      paymentMethod: paymentMethod,
      customer: form,
      status: "pending",
      createdAt: serverTimestamp()
    };

    try {

      await placeOrder(order);

      clearCart();

      toast.success("Payment Successful & Order Placed");

      navigate("/orders");

    } catch (error) {

      toast.error("Failed to place order");

    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-20">

      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Customer Form */}
        <div className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Payment Method */}
          <div className="mt-4">

            <h3 className="font-semibold mb-2">
              Select Payment Method
            </h3>

            <div className="flex gap-4">

              <button
                onClick={() => setPaymentMethod("Easypaisa")}
                className={`px-4 py-2 border rounded-lg cursor-pointer ${
                  paymentMethod === "Easypaisa"
                    ? "bg-green-500 text-white"
                    : ""
                }`}
              >
                Easypaisa
              </button>

              <button
                onClick={() => setPaymentMethod("Stripe")}
                className={`px-4 py-2 border rounded-lg cursor-pointer ${
                  paymentMethod === "Stripe"
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
              >
                Stripe
              </button>

            </div>

          </div>

        </div>

        {/* Order Summary */}
        <div className="border p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          {cartItems.map((item) => (

            <div
              key={item.id}
              className="flex justify-between mb-2"
            >

              <span>
                {item.name} x {item.quantity}
              </span>

              <span>
                ${(item.price * item.quantity).toFixed(2)}
              </span>

            </div>

          ))}

          <hr className="my-4"/>

          <div className="flex justify-between font-bold text-lg">

            <span>Total</span>

            <span>${total.toFixed(2)}</span>

          </div>

          <button
            onClick={handleOrder}
            className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 active:bg-orange-600 transition cursor-pointer "
          >
            Confirm Payment & Place Order
          </button>

        </div>

      </div>

    </div>
  );
};

export default Checkout;