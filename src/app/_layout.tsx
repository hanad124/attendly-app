import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuthStore } from "../stores/auth";
import Toast from 'react-native-toast-message';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';

import "../global.css";
import BottomSheet from "@/components/BottomSheet";

import logo from '../assets/images/login-logo.png'

export default function RootLayout() {
  const { isAuthenticated, initialized, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, []);

  if (!initialized) {
    console.log("isAuthenticated:", isAuthenticated);
    console.log("Initializing auth state...");
    return <>
    <View className="flex-1 justify-center items-center bg-primary">
      <Image
        source={logo}
        className={`w-24 h-24 rounded-full mr-4`}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#fff" className="mt-4" />
    </View>
    </>;
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


