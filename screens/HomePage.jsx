import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePage from "./CreatePage";
import Loading from "../components/Loading";

const HomePage = () => {
  const Tabs = createBottomTabNavigator();

  return <Loading />;
};

export default HomePage;
