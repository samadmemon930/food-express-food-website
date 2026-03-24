import { db } from "./FirebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot
} from "firebase/firestore";

const ordersRef = collection(db, "orders");

// ✅ Place Order
export const placeOrder = async (order) => {
  const docRef = await addDoc(ordersRef, order);
  return docRef.id;
};

// ✅ REALTIME USER ORDERS
export const subscribeUserOrders = (userId, callback) => {
  const q = query(
    ordersRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    callback(orders);
  });

  return unsubscribe;
};