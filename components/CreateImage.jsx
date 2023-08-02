import React, { useState } from "react";
import { Card } from "react-native-paper";

import { themeColors } from "../theme";
import tw from "twrnc";
import { FontAwesome } from "@expo/vector-icons";

const CreateImage = ({ image }) => {
  const [likedImages, setLikedImages] = useState([]);
  const isLiked = likedImages.includes(image);

  const handleLike = (imageUri) => {
    if (isLiked) {
      setLikedImages(likedImages.filter((img) => img !== imageUri));
      console.log(likedImages);
    } else {
      setLikedImages([...likedImages, imageUri]);
      console.log(likedImages);
    }
  };

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
            name={isLiked ? "heart" : "heart-o"}
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              fontSize: 30,
              backgroundColor: "#fff",
              color: "#b30000",
              padding: 15,
              margin: 15,
              borderRadius: 20,
            }}
            onPress={() => handleLike(image)}
          />
        </>
      )}
    </Card>
  );
};

export default CreateImage;
