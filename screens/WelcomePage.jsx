import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { themeColors } from "../theme";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const WelcomePage = () => {
  const navigation = useNavigation();
  return (
    <View style={[tw`flex-1`, { backgroundColor: themeColors.bg }]}>
      <SafeAreaView style={[tw`flex-1 flex justify-around my-4 p-3`]}>
        <Text style={[tw`text-white font-bold text-4xl text-center`]}>
          Let's Get Started
        </Text>
        <View style={tw`flex-row justify-center`}>
          <Image
            source={require("../assets/adaptive-icon.png")}
            style={{ width: 350, height: 350 }}
          />
        </View>
        <View style={tw`mt-4`}>
          <TouchableOpacity
            onPress={() => navigation.navigate("signup")}
            style={tw`py-3 bg-yellow-400 mx-7 rounded-xl`}
          >
            <Text style={tw`text-xl font-bold text-center text-gray-700`}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <View style={tw`flex-row justify-center m-4`}>
            <Text style={tw`text-white font-semibold`}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text style={tw`font-semibold text-yellow-400 ml-2`}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default WelcomePage;
