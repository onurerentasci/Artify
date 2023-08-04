import { View, Image, Text, Animated, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";

export default function Loading() {
  const edges = useSafeAreaInsets();

  const startAnimation = useRef(new Animated.Value(0)).current;

  const scaleLogo = useRef(new Animated.Value(1)).current;
  const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(startAnimation, {
          toValue: -Dimensions.get("window").height + +(edges.top + 65),
          useNativeDriver: true,
        }),
        Animated.timing(scaleLogo, {
          toValue: 0.28,
          useNativeDriver: true,
        }),
        Animated.timing(moveLogo, {
          toValue: {
            x: Dimensions.get("window").width / 2 - 35,
            y: Dimensions.get("window").height / 0.61,
          },
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);
  }, []);

  return (
    <View style={tw`absolute top-0 bottom-0 left-0 right-0 `}>
      <Animated.View
        style={[
          tw`flex justify-center items-center z-0`,
          {
            height: "100%",
            backgroundColor: "green",
            transform: [{ translateY: startAnimation }],
          },
        ]}
      >
        <Animated.View style={tw`flex justify-center items-center`}>
          <Animated.Image
            source={require("../assets/logo.png")}
            style={{
              width: 350,
              height: 350,
              padding: 0,
              transform: [{ scale: scaleLogo }, { translateY: moveLogo.y }],
            }}
          ></Animated.Image>
        </Animated.View>
      </Animated.View>
    </View>
  );
}
