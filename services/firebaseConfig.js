// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpfAGaSOyw13HbVEoXTKYkHnzHFKqukGI",
  authDomain: "p2prentalapp-97337.firebaseapp.com",
  projectId: "p2prentalapp-97337",
  storageBucket: "p2prentalapp-97337.firebasestorage.app",
  messagingSenderId: "1009725367824",
  appId: "1:1009725367824:web:21e14e753d68a61da88c95",
  measurementId: "G-BN3XD2FZYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);