import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { AuthContext } from "../context/AuthContext";
import ItemCard from "../components/ItemCard";

const ProfileScreen = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user's info
  const [uploadedItems, setUploadedItems] = useState([]);
  const [rentalHistory, setRentalHistory] = useState([]);

  useEffect(() => {
    if (!user) return;

    // Fetch uploaded items
    const fetchUploadedItems = async () => {
      const q = query(collection(db, "items"), where("ownerId", "==", user.uid));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUploadedItems(items);
    };

    // Fetch rental history
    const fetchRentalHistory = async () => {
      const q = query(collection(db, "transactions"), where("renterId", "==", user.uid));
      const snapshot = await getDocs(q);
      const transactions = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRentalHistory(transactions);
    };

    fetchUploadedItems();
    fetchRentalHistory();
  }, [user]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>You need to log in to view your profile.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Uploaded Items</Text>
      <FlatList
        data={uploadedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No items uploaded yet.</Text>}
      />

      <Text style={styles.sectionTitle}>Rental History</Text>
      <FlatList
        data={rentalHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionCard}>
            <Text style={styles.transactionText}>Item ID: {item.itemId}</Text>
            <Text style={styles.transactionText}>Status: {item.status}</Text>
            <Text style={styles.transactionText}>
              Total Price: ${item.totalPrice.toFixed(2)}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No rental history available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  empty: { fontSize: 14, color: "#777", textAlign: "center", marginVertical: 10 },
  transactionCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  transactionText: { fontSize: 14, color: "#333" },
  error: { color: "red", textAlign: "center", fontSize: 16 },
});

export default ProfileScreen;