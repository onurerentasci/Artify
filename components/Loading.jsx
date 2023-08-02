import { View, Image, Text } from "react-native";
import React from "react";
import tw from "twrnc";

export default function Loading() {
  return (
    <View style={[tw`flex justify-center items-center`, { height: "100%" }]}>
      <Image
        source={require("../assets/adaptive-icon.png")}
        style={{ width: 350, height: 350 }}
      />
      <Text>Loading</Text>
    </View>
  );
}
