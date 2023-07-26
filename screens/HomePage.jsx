import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { themeColors } from "../theme";

const HomePage = () => {
  return (
    <View style={[tw`flex-1 bg-white`, { backgroundColor: themeColors.bg }]}>
      <Text>Test</Text>
    </View>
  );
};

export default HomePage;
