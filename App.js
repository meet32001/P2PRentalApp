import React from "react";
import { AuthProvider } from "./services/AuthContext"; // Adjust path
import AppNavigator from "./navigation/AppNavigator"; 
import { ThemeProvider } from "./context/ThemeContext"; // Adjust path

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;