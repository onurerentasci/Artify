import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Subheading } from "react-native-paper";
import tw from "twrnc";

import { themeColors } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, firestore } from "../config/firebase";
import firebase from "firebase/compat/app";

const Signup = () => {
  const navigation = useNavigation();

  const [username, setUserame] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("home");
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const createAccount = async () => {
    if (email && password && username) {
      setIsLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await firestore
          .collection("userData")
          .doc(userCredential.user.uid)
          .set({
            email: email,
            username: username,
          });
        navigation.navigate("home");
      } catch (e) {
        setIsLoading(false);

        if (e.code === "auth/invalid-email") {
          setError("Please enter a valid email address.");
        } else if (e.code === "auth/weak-password") {
          setError("Password should be at least 6 characters");
        } else if (e.code === "auth/email-already-in-use") {
          setError("E-mail already in use!");
        } else if (e.code === "auth/network-request-failed") {
          setError("Check your connection");
        } else {
          setError(e.message);
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
            source={require("../assets/signup.png")}
            style={{ width: 150, height: 150 }}
          />
        </View>
      </SafeAreaView>
      <View
        style={[
          tw`flex-1 bg-white px-8 pt-8`,
          { borderTopLeftRadius: 50, borderTopRightRadius: 50 },
        ]}
      >
        <View>
          {!!error && (
            <Subheading
              style={{
                color: themeColors.yellow_button,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              {error}
            </Subheading>
          )}
          <Text style={tw`text-gray-700 ml-4 mb-2 mt-3`}>Username</Text>
          <TextInput
            style={tw`p-3 pl-4 bg-gray-100 text-gray-700 rounded-2xl mb-3`}
            value={username}
            onChangeText={(value) => setUserame(value)}
            placeholder="Enter Username"
          />
          <Text style={tw`text-gray-700 ml-4 mb-2`}>Email Adress</Text>
          <TextInput
            style={tw`p-3 pl-4 bg-gray-100 text-gray-700 rounded-2xl mb-3`}
            keyboardType="email-address"
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder="Enter Email"
          />
          <Text style={tw`text-gray-700 ml-4 mb-2`}>Password</Text>
          <TextInput
            style={tw`p-3 pl-4 bg-gray-100 text-gray-700 rounded-2xl mb-3`}
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
            placeholder="Enter Password"
          />

          <Button
            style={tw`py-1 bg-yellow-400 rounded-2xl mt-3`}
            mode="contained"
            textColor="#374151"
            onPress={createAccount}
            loading={isLoading}
          >
            Sign Up
          </Button>
        </View>
        <View style={tw`flex-row justify-center mt-7`}>
          <Text style={tw`text-gray-500 font-semibold`}>
            Already have an account ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={tw`font-semibold text-yellow-500 ml-2`}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;
