import { View, Text } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import tw from "twrnc";
import { themeColors } from "../theme";

export default function LikedImages() {
  return (
    <Card
      style={[
        tw`mt-1`,
        {
          height: "85%",
          backgroundColor: themeColors.yellow_button,
          borderWidth: 3,
          borderColor: themeColors.yellow_button,
        },
      ]}
    >
      <Card.Cover />
    </Card>
  );
}
