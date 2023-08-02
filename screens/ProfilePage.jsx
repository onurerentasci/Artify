import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { themeColors } from "../theme";
import tw from "twrnc";
import firebase from "firebase/compat/app";

const ProfilePage = () => {
  const [email, setEmail] = useState("");
  const [likedImages, setLikedImages] = useState([]);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setEmail(user?.email ?? "");
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={[tw`flex-1`, { backgroundColor: themeColors.bg }]}>
      <SafeAreaView style={[tw`flex-1 flex justify-around my-4 pt-3`]}>
        <View style={[tw`flex justify-center items-center m-3`]}>
          <Text style={[tw`text-white font-bold text-xl text-center`]}>
            {email.split("@")[0]}
          </Text>
        </View>
        <ScrollView>
          {likedImages.map((likedImage, index) => (
            <CreateImage key={index} image={likedImage} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ProfilePage;
