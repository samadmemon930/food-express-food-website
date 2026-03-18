import { db } from "./FirebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy
} from "firebase/firestore";

const ordersRef = collection(db, "orders");

export const placeOrder = async (order) => {
  const docRef = await addDoc(ordersRef, order);
  return docRef.id;
};

export const getUserOrders = async (userId) => {
  const q = query(
    ordersRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};