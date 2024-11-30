// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpfAGaSOyw13HbVEoXTKYkHnzHFKqukGI",
  authDomain: "p2prentalapp-97337.firebaseapp.com",
  projectId: "p2prentalapp-97337",
  storageBucket: "p2prentalapp-97337.appspot.com",
  messagingSenderId: "1009725367824",
  appId: "1:1009725367824:web:21e14e753d68a61da88c95",
  measurementId: "G-BN3XD2FZYK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
console.log("Firebase App Initialized:", app.name); // Should log "[DEFAULT]"