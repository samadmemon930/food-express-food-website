import { useState, useEffect, useContext } from "react";
import { db } from "../Services/FirebaseConfig";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  getDoc,
  getDocs
} from "firebase/firestore";
import { AuthContext } from "../Context/AuthContext";

export const useCart = () => {

  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {

    if (!user) return;

    const cartRef = collection(db, "carts", user.uid, "items");

    const unsubscribe = onSnapshot(cartRef, (snapshot) => {

      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCartItems(items);

    });

    return () => unsubscribe();

  }, [user]);


  const addToCart = async (item) => {

    if (!user) return;

    const ref = doc(db, "carts", user.uid, "items", item.id.toString());

    const snap = await getDoc(ref);

    if (snap.exists()) {

      await updateDoc(ref, {
        quantity: snap.data().quantity + 1
      });

    } else {

      await setDoc(ref, {
        ...item,
        quantity: 1
      });

    }

  };


  const increaseQty = async (item) => {

    const ref = doc(db, "carts", user.uid, "items", item.id.toString());

    await updateDoc(ref, {
      quantity: item.quantity + 1
    });

  };


  const decreaseQty = async (item) => {

    if (item.quantity === 1) return;

    const ref = doc(db, "carts", user.uid, "items", item.id.toString());

    await updateDoc(ref, {
      quantity: item.quantity - 1
    });

  };


  const deleteItem = async (id) => {

    await deleteDoc(doc(db, "carts", user.uid, "items", id.toString()));

  };


  const clearCart = async () => {

    const cartRef = collection(db, "carts", user.uid, "items");

    const snapshot = await getDocs(cartRef);

    await Promise.all(snapshot.docs.map((d) => deleteDoc(d.ref)));

  };

  return {
    cartItems,
    addToCart,
    increaseQty,
    decreaseQty,
    deleteItem,
    clearCart
  };

};