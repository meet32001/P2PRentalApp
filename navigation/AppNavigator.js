import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Alert } from "react-native";
import { logout } from "../services/authService";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import AddItemScreen from "../screens/AddItemScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";
import ProfileScreen from "../screens/ProfileScreen"; // Ensure correct path

const Stack = createStackNavigator();

const AppNavigator = () => {
  const handleLogout = async (navigation) => {
    try {
      await logout();
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login Screen */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Home Screen with Logout Button */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                onPress={() => handleLogout(navigation)}
                title="Logout"
                color="#f00"
              />
            ),
          })}
        />

        {/* Add Item Screen */}
        <Stack.Screen name="AddItem" component={AddItemScreen} />

        {/* Item Detail Screen */}
        <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />

        {/* Profile Screen */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;