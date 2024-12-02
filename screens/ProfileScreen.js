import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext"; // Import Theme Context
import { lightTheme, darkTheme } from "../styles/themes"; // Import Themes
import { AuthContext } from "../services/AuthContext"; // Import Auth Context
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig"; // Import Firebase Config
import ItemCard from "../components/ItemCard"; // Import ItemCard

const ProfileScreen = () => {
  const { isDarkMode } = useTheme(); // Access Theme Context
  const theme = isDarkMode ? darkTheme : lightTheme;

  const { user } = useContext(AuthContext); // Access Auth Context
  const [uploadedItems, setUploadedItems] = useState([]);
  const [rentalHistory, setRentalHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch uploaded items and rental history from Firebase
  useEffect(() => {
    if (!user) return; // Exit if no user

    const fetchUploadedItems = async () => {
      try {
        const q = query(collection(db, "items"), where("ownerId", "==", "userUid123"));
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUploadedItems(items);
      } catch (error) {
        console.error("Error fetching uploaded items:", error);
      }
    };

    const fetchRentalHistory = async () => {
      try {
        const q = query(collection(db, "transactions"), where("renterId", "==", "userUid123"));
        const snapshot = await getDocs(q);
        const rentals = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRentalHistory(rentals);
      } catch (error) {
        console.error("Error fetching rental history:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUploadedItems(), fetchRentalHistory()]);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Loading your profile...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Uploaded Items Section */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Uploaded Items</Text>
      <FlatList
        data={uploadedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} />}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: theme.text }]}>No items uploaded yet.</Text>
        }
      />

      {/* Rental History Section */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Rental History</Text>
      <FlatList
        data={rentalHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.transactionCard, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.transactionText, { color: theme.text }]}>
              Item ID: {item.itemId || "N/A"}
            </Text>
            <Text style={[styles.transactionText, { color: theme.text }]}>
              Status: {item.status || "N/A"}
            </Text>
            <Text style={[styles.transactionText, { color: theme.text }]}>
              Total Price: ${item.totalPrice ? item.totalPrice.toFixed(2) : "N/A"}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: theme.text }]}>No rental history available.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  empty: { fontSize: 14, textAlign: "center", marginVertical: 10 },
  transactionCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  transactionText: { fontSize: 14, marginBottom: 5 },
});

export default ProfileScreen;