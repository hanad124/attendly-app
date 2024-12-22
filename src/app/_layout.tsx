import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuthStore } from "../stores/auth";
import Toast from 'react-native-toast-message';

// import global css
import "../global.css";
import BottomSheet from "@/components/BottomSheet";

export default function RootLayout() {
  const { isAuthenticated, initialized, initialize } = useAuthStore();

  // Initialize auth state when app starts
  useEffect(() => {
    initialize();
  }, []);

  // Don't render anything until we've initialized auth
  if (!initialized) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Toast />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack>
      <BottomSheet />
    </GestureHandlerRootView>
  );
}
