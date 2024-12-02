import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Alert } from "react-native";
import { logout } from "./services/authService";
import HomeScreen from "./screens/HomeScreen";
import AddItemScreen from "./screens/AddItemScreen";
import ItemDetailScreen from "./screens/ItemDetailScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import { AuthProvider } from "./services/AuthContext";
import AppNavigator from "./navigation/AppNavigator"; 

const Stack = createStackNavigator();

const AppNavigator = () => {
  const handleLogout = async (navigation) => {
    try {
      await logout();
      navigation.replace("Login"); // Navigate to Login screen after logout
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
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
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AddItem" component={AddItemScreen} />
        <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;