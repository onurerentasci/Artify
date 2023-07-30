import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { themeColors } from "../theme";
import tw from "twrnc";

const ProfilePage = () => {
  const [email, setEmail] = useState("");
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
      <SafeAreaView style={[tw`flex-1 flex justify-around my-4 p-3`]}>
        <ScrollView>
          <Text>{email.split("@")[0]}</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ProfilePage;
