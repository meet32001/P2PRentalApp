import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const ItemCard = ({ item }) => {
  // console.log("Item data:", item); // Debug log

  return (
    <TouchableOpacity style={styles.card}>
      {/* Title */}
      <Text style={styles.title}>{item.title || "Untitled Item"}</Text>

      {/* Description */}
      <Text style={styles.description}>{item.description || "No description available"}</Text>

      {/* Price */}
      <Text style={styles.price}>
        Price per Day: ${typeof item.pricePerDay === "number" ? item.pricePerDay.toFixed(2) : "N/A"}
      </Text>

      {/* Location */}
      <Text style={styles.info}>Location: {item.location || "Unknown"}</Text>

      {/* Availability */}
      <Text style={styles.info}>
        Availability: {item.isAvailable ? "Available" : "Not Available"}
      </Text>

      {/* Created At */}
      <Text style={styles.info}>
        Posted On: {item.createdAt ? new Date(item.createdAt.seconds * 1000).toLocaleDateString() : "Unknown"}
      </Text>
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
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  image: { width: "100%", height: 150, borderRadius: 8, marginBottom: 10 },
  description: { fontSize: 14, color: "#555", marginBottom: 10 },
  price: { fontSize: 16, color: "#4CAF50", marginBottom: 5 },
  info: { fontSize: 14, color: "#333", marginBottom: 5 },
});

export default ItemCard;