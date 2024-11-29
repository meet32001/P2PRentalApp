import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Signup function
export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Login function
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};