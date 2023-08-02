import "react-native-url-polyfill/auto";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "../hooks/useAuth";
import HomePage from "../screens/HomePage";
import CreatePage from "../screens/CreatePage";
import ProfilePage from "../screens/ProfilePage";
import LoginPage from "../screens/LoginPage";
import Signup from "../screens/Signup";
import WelcomePage from "../screens/WelcomePage";
import Loading from "../components/Loading";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(loadingTimer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            name="home"
            options={{ headerShown: false }}
            component={HomePage}
          />
          <Stack.Screen
            name="create"
            options={{ headerShown: false }}
            component={CreatePage}
          />
          <Stack.Screen
            name="profile"
            options={{ headerShown: false }}
            component={ProfilePage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="welcome">
          <Stack.Screen
            name="login"
            options={{ headerShown: false }}
            component={LoginPage}
          />
          <Stack.Screen
            name="signup"
            options={{ headerShown: false }}
            component={Signup}
          />
          <Stack.Screen
            name="welcome"
            options={{ headerShown: false }}
            component={WelcomePage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
