import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { addItem } from "../services/itemService";

const AddItemScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const handleAddItem = async () => {
    if (!title || !description || !price) {
      setError("All fields are required.");
      return;
    }

    try {
      await addItem({ title, description, price: parseFloat(price) });
      navigation.goBack();
    } catch (error) {
      setError("Failed to add item.");
      console.error("Error adding item:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Item</Text>
      <TextInput
        placeholder="Title"
        style={styles.input}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Price"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5 },
  error: { color: "red", marginBottom: 10 },
});

export default AddItemScreen;