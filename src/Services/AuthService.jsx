import { auth, db } from "./FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const registerUser = async (name, email, password) => {

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    createdAt: serverTimestamp()
  });

  // register ke baad logout
  await signOut(auth);

  return userCredential;
};

// src/Services/AuthService.jsx
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  // ✅ Sirf UID manually save
  localStorage.setItem("uid", userCredential.user.uid);

  return userCredential;
};

export const logoutUser = async () => {
  await signOut(auth);

  // ✅ UID remove
  localStorage.removeItem("uid");
};