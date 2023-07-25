import { StatusBar } from "expo-status-bar";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomePage from "./screens/WelcomePage";
import Signup from "./screens/Signup";
import LoginPage from "./screens/LoginPage";
import HomePage from "./screens/HomePage";
import CreatePage from "./screens/CreatePage";
import ProfilePage from "./screens/ProfilePage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
  const navigation = useNavigation();
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons
              name={route.name === "create" ? "search" : "person"}
              color={color}
              size={size}
            />
          );
        },
      })}
    >
      <Tabs.Screen
        name="create"
        component={CreatePage}
        options={{ headerShown: false }}
      />
      <Tabs.Screen
        name="profile"
        component={ProfilePage}
      />
    </Tabs.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TabsNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
