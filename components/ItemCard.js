import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ItemCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  price: { fontSize: 16, color: "#4CAF50", marginTop: 5 },
});

export default ItemCard;