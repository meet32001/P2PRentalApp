import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { AuthContext } from "../services/AuthContext";
import ItemCard from "../components/ItemCard";

const ProfileScreen = () => {
  const { user } = useContext(AuthContext); // Ensure user context is available
  const [uploadedItems, setUploadedItems] = useState([]);
  const [rentalHistory, setRentalHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return; // Exit if user is not available

    const fetchUploadedItems = async () => {
      try {
        // Fetch items where ownerId matches the current user ID
        const q = query(collection(db, "items"), where("ownerId", "==", user.uid));
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Uploaded Items:", items); // Debugging fetched data
        setUploadedItems(items);
      } catch (error) {
        console.error("Error fetching uploaded items:", error);
      }
    };

    const fetchRentalHistory = async () => {
      try {
        // Fetch user's rental history from their Firestore document
        const userDocRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const { rentalHistory } = userSnapshot.data();
          if (rentalHistory && rentalHistory.length > 0) {
            // Fetch transactions based on IDs in the rentalHistory array
            const rentals = await Promise.all(
              rentalHistory.map(async (transactionId) => {
                const transactionDocRef = doc(db, "transactions", transactionId);
                const transactionSnapshot = await getDoc(transactionDocRef);
                return { id: transactionSnapshot.id, ...transactionSnapshot.data() };
              })
            );
            console.log("Rental History:", rentals); // Debugging fetched data
            setRentalHistory(rentals);
          } else {
            console.log("No rental history found.");
            setRentalHistory([]);
          }
        } else {
          console.log("User document does not exist.");
        }
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
      <View style={styles.center}>
        <Text>Loading your profile...</Text>
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
        ListEmptyComponent={
          <Text style={styles.empty}>No items uploaded yet.</Text>
        }
      />

      <Text style={styles.sectionTitle}>Rental History</Text>
      <FlatList
        data={rentalHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionCard}>
            <Text style={styles.transactionText}>
              Item ID: {item.itemId || "N/A"}
            </Text>
            <Text style={styles.transactionText}>
              Status: {item.status || "N/A"}
            </Text>
            <Text style={styles.transactionText}>
              Total Price: $
              {item.totalPrice ? item.totalPrice.toFixed(2) : "N/A"}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No rental history available.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginVertical: 10,
  },
  transactionCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  transactionText: { fontSize: 14, color: "#333" },
});

export default ProfileScreen;