import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Subheading } from "react-native-paper";
import tw from "twrnc";

import { themeColors } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const LoginAccount = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate("home");
      } catch (e) {
        if (e.code === "auth/invalid-email") {
          setError("Please enter a valid email address.");
        } else if (e.code === "auth/weak-password") {
          setError("Password should be at least 6 characters");
        } else if (e.code === "auth/wrong-password") {
          setError("Wrong password");
        } else if (e.code === "auth/email-already-in-use") {
          setError("E-mail already in use!");
        } else {
          console.log(e.message);
        }
      }
    }
  };

  return (
    <View style={[tw`flex-1 bg-white`, { backgroundColor: themeColors.bg }]}>
      <SafeAreaView style={tw`flex p-3`}>
        <View style={tw`flex-row justify-start pt-6`}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-3`}
          >
            <Ionicons name="arrow-back" size={30} />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row justify-center`}>
          <Image
            source={require("../assets/login.png")}
            style={{ width: 200, height: 200, objectFit: "contain" }}
          />
        </View>
      </SafeAreaView>
      <View
        style={[
          tw`flex-1 bg-white px-8 pt-5`,
          { borderTopLeftRadius: 50, borderTopRightRadius: 50 },
        ]}
      >
        <View>
          {!!error && (
            <Subheading
              style={{
                color: "#facc15",
                textAlign: "center",
                fontSize: 14,
              }}
            >
              {error}
            </Subheading>
          )}
          <Text style={tw`text-gray-700 ml-4 mb-2 mt-3`}>Email Adress</Text>
          <TextInput
            style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3`}
            value={email}
            keyboardType="email-address"
            onChangeText={(value) => setEmail(value)}
            placeholder="Enter Email"
          />
          <Text style={tw`text-gray-700 ml-4 mb-2`}>Password</Text>
          <TextInput
            style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl`}
            value={password}
            secureTextEntry
            onChangeText={(value) => setPassword(value)}
            placeholder="Enter Password"
          />
          <TouchableOpacity style={tw`flex items-end mt-5`}>
            <Text style={tw`flex items-end mb-1`}>Forgot Password?</Text>
          </TouchableOpacity>
          <Button
            style={tw`py-1 bg-yellow-400 rounded-2xl mt-3`}
            mode="contained"
            textColor="#374151"
            onPress={LoginAccount}
            loading={isLoading}
          >
            Login
          </Button>
        </View>
        <View style={tw`flex-row justify-center mt-7`}>
          <Text style={tw`text-gray-500 font-semibold`}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text style={tw`font-semibold text-yellow-500 ml-2`}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
