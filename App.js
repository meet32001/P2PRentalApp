import React from "react";
import { AuthProvider } from "./services/AuthContext"; // Adjust path if needed
import AppNavigator from "./navigation/AppNavigator"; // Correct path to AppNavigator

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;