import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ItemDetailScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 20 },
  price: { fontSize: 18, color: "#4CAF50" },
});

export default ItemDetailScreen;