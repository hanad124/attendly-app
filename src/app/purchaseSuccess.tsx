import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Check } from "lucide-react-native";

export default function PurchaseSuccessPage() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center px-4">
      <View className="items-center w-full">
        <View className="relative mb-10">
          <View className="absolute inset-0 bg-blue-200 rounded-full opacity-50 scale-150" />
          
          <View className="absolute inset-0 bg-blue-300/70 rounded-full opacity-50 scale-125" />
          
          <View className="bg-blue-500 rounded-full p-5 z-10 relative">
            <Check size={60} color="white" strokeWidth={2} />
          </View>
        </View>
        
        <Text className="text-3xl font-bold text-gray-800 mt-6 text-center">
          Purchase Successful
        </Text>
        
        <Text className="text-lg text-gray-600 mt-4 text-center px-4">
          You purchased the package and activated successfully.
        </Text>
        
        <View className="px-8 w-full">
          <TouchableOpacity 
            className="bg-primary py-3 px-6 rounded-lg mt-10 w-full"
            onPress={handleBackToHome}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}