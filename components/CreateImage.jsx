import React, { useState } from "react";
import { Card } from "react-native-paper";

import { themeColors } from "../theme";
import tw from "twrnc";
import { FontAwesome } from "@expo/vector-icons";

const CreateImage = ({ image }) => {
  return (
    <Card
      style={[
        tw`mt-5`,
        {
          height: "85%",
          backgroundColor: themeColors.bg,
          borderWidth: 3,
          borderColor: themeColors.yellow_button,
        },
      ]}
    >
      {image && (
        <>
          <Card.Cover source={{ uri: image }} style={[{ height: "100%" }]} />
          <FontAwesome
            name="heart-o"
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              fontSize: 40,
              backgroundColor: "#fff",
              padding: 10,
              margin: 10,
              borderRadius: 30,
            }}
          />
        </>
      )}
    </Card>
  );
};

export default CreateImage;
