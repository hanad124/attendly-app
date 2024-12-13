import React from "react";
import { Button } from "react-native";
import { Stack, router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// import global css
import "../global.css";
import BottomSheet from "@/components/BottomSheet";

export default function _layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "red",
          },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Home",
            headerRight: () => (
              <Button
                onPress={() => {
                  router.push("contact");
                }}
                title="Home"
              />
            ),
          }}
        />

        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(tabs)/(packages)" />
        <Stack.Screen name="(tabs)/(packages)/[id]" />
      </Stack>
        <BottomSheet />
    </GestureHandlerRootView>
  );
}
