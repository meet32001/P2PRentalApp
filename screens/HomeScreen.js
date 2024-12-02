import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { AuthContext } from "../services/AuthContext"; // Correct path to AuthContext
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig"; // Adjust path if needed
import ItemCard from "../components/ItemCard"; // Ensure ItemCard exists and is correctly defined

const HomeScreen = ({ navigation }) => {
  const { user, loading } = useContext(AuthContext); // Access AuthContext

  const [items, setItems] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsCollection = collection(db, "items");
        const snapshot = await getDocs(itemsCollection);
        const itemsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsList);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Authenticating...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>You must log in to access this screen.</Text>
        <Button title="Go to Login" onPress={() => navigation.replace("Login")} />
      </View>
    );
  }

  if (fetching) {
    return (
      <View style={styles.center}>
        <Text>Loading items...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Go to Profile" onPress={() => navigation.navigate("Profile")} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} />}
        ListEmptyComponent={
          <Text style={styles.empty}>No items available for rent.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: { textAlign: "center", color: "#777", marginTop: 20 },
});

export default HomeScreen;