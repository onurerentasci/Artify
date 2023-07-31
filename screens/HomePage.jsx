import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { themeColors } from "../theme";
import { Octicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfilePage from "./ProfilePage";
import CreatePage from "./CreatePage";

const HomePage = () => {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: { display: "none" },
        tabBarStyle: { height: 70 },
        tabBarOptions: {
          showLabel: false,
        },
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Octicons
              name={route.name === "create" ? "plus" : "person"}
              color={color}
              size={36}
            />
          );
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen
        name="create"
        component={CreatePage}
        options={{
          tabBarActiveTintColor: themeColors.yellow_button,
        }}
      />
      <Tabs.Screen
        name="profile"
        component={ProfilePage}
        options={{ tabBarActiveTintColor: themeColors.yellow_button }}
      />
    </Tabs.Navigator>
  );
};

export default HomePage;
