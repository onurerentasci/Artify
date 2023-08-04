import { View, Animated, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";
import { themeColors } from "../theme";

export default function Loading() {
  const edges = useSafeAreaInsets();

  const startAnimation = useRef(new Animated.Value(0)).current;

  const scaleLogo = useRef(new Animated.Value(1)).current;
  const scaleTitle = useRef(new Animated.Value(1)).current;

  const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const contentTransition = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;

  useEffect(() => {
    // Starting Animation after 2000ms....
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(startAnimation, {
          toValue: -Dimensions.get("window").height + (edges.top + 30),
          useNativeDriver: true,
        }),
        Animated.timing(scaleLogo, {
          toValue: 0.2,
          useNativeDriver: true,
        }),

        Animated.timing(moveLogo, {
          toValue: {
            x: Dimensions.get("window").width / 2 - 55,
            y: Dimensions.get("window").height * 0.515,
          },
          useNativeDriver: true,
        }),
        Animated.timing(moveTitle, {
          toValue: {
            x: Dimensions.get("window").width / 2 - 330,
            y: Dimensions.get("window").height / 2 - 125,
          },
          useNativeDriver: true,
        }),
        Animated.timing(contentTransition, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);
  }, []);

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: themeColors.title,
          zIndex: 1,
          transform: [{ translateY: startAnimation }],
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.Image
            source={require("../assets/logo.png")}
            style={{
              width: 200,
              height: 200,
              marginBottom: 20,
              transform: [
                { translateX: moveLogo.x },
                { translateY: moveLogo.y },
                { scale: scaleLogo },
              ],
            }}
          ></Animated.Image>

          <Animated.Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "white",
              transform: [
                { translateY: moveTitle.y },
                { translateX: moveTitle.x },
                { scale: scaleTitle },
              ],
            }}
          >
            Artify
          </Animated.Text>
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0,0,0,0.04)",
          zIndex: 0,
          transform: [{ translateY: contentTransition }],
        }}
      ></Animated.View>
    </View>
  );
}
