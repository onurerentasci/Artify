import React, { useEffect, useState } from "react";
import { View, SafeAreaView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { API_KEY } from "@env";
import CreateImage from "../components/CreateImage";
import { themeColors } from "../theme";
import tw from "twrnc";
import "react-native-url-polyfill";

const CreatePage = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedModel, setSelectedModel] = useState("SDCreate");

  async function SDCreate() {
    try {
      setImage(null);
      setIsLoading(true);
      const response = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );
      const blob = await response.blob();
      const dataUrl = await convertBlobToDataUrl(blob);
      setImage(dataUrl);
    } catch (e) {
      console.warn(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function convertBlobToDataUrl(blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  return (
    <View
      style={[
        tw`flex-1 bg-white h-4/5`,
        { backgroundColor: themeColors.bg_light },
      ]}
    >
      <SafeAreaView style={[tw`flex mt-5  p-2`, { marginTop: "10%" }]}>
        <View style={tw`flex flex-row justify-center items-center`}>
          <TextInput
            style={[tw`bg-purple-100 text-gray-700 w-2/3 ml-1 mr-3 mb-2`]}
            keyboardType="default"
            placeholder="Enter prompt here"
            mode="outlined"
            outlineColor={themeColors.yellow_button}
            onChangeText={(prompt) => setPrompt(prompt)}
          />
          <Button
            style={tw`py-1 bg-yellow-400 rounded-2xl`}
            mode="contained"
            textColor="#374151"
            loading={isLoading}
            onPress={() => {
              if (selectedModel === "SDCreate") {
                SDCreate();
              } else if (selectedModel === "DSCreate") {
                DSCreate();
              }
            }}
          >
            Magic!
          </Button>
        </View>

        <View>
          <CreateImage image={image} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CreatePage;
