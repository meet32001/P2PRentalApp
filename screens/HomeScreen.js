import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext"; // Import Theme Context
import { lightTheme, darkTheme } from "../styles/themes"; // Import Themes
import { AuthContext } from "../services/AuthContext"; // Import Auth Context
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig"; // Import Firebase Config
import ItemCard from "../components/ItemCard"; // Import ItemCard Component

const HomeScreen = ({ navigation }) => {
  const { isDarkMode, toggleTheme } = useTheme(); // Access Theme Context
  const theme = isDarkMode ? darkTheme : lightTheme;

  const { user, loading } = useContext(AuthContext); // Access Auth Context
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
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Authenticating...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>You must log in to access this screen.</Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.replace("Login")}
          color={theme.button}
        />
      </View>
    );
  }

  if (fetching) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Loading items...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Button
        title={`Switch to ${isDarkMode ? "Light" : "Dark"} Mode`}
        onPress={toggleTheme}
        color={theme.button}
      />

      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
        color={theme.button}
      />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} />}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: theme.text }]}>
            No items available for rent.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, marginBottom: 20 },
  empty: { textAlign: "center", marginTop: 20 },
});

export default HomeScreen;