import { Stack } from "expo-router";
import BottomSheet from "@/components/BottomSheet";

export default function PackagesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // headerStyle: {
        //   backgroundColor: '#f4511e',
        // },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
