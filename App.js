import React from "react";
import AppNavigation from "./navigation/AppNavigation";
import "react-native-url-polyfill/auto";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigation />
    </SafeAreaProvider>
  );
}
