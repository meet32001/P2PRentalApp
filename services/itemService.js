import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Add a new rental item
export const addItem = async (item) => {
  const itemsRef = collection(db, "items");
  return await addDoc(itemsRef, item);
};

// Fetch all rental items
export const fetchItems = async () => {
  const itemsRef = collection(db, "items");
  const snapshot = await getDocs(itemsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
