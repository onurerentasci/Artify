import React, { useState } from "react";
import { Card } from "react-native-paper";

import { themeColors } from "../theme";
import tw from "twrnc";

const CreateImage = ({ image }) => {
  return (
    <Card
      style={[
        tw`mt-5`,
        {
          height: "85%",
          backgroundColor: themeColors.create_canvas,
          borderWidth: 3,
          borderColor: themeColors.yellow_button,
        },
      ]}
    >
      {image && (
        <Card.Cover source={{ uri: image }} style={[{ height: "100%" }]} />
      )}
    </Card>
  );
};

export default CreateImage;
