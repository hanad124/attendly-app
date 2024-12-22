import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

import { useRouter } from "expo-router";

import { Bell, Copy } from "lucide-react-native";

import avatorImage from "@/assets/images/avator-img.jpg";

export default function Avator() {
  const router = useRouter();
  return (
    <View className={` flex flex-row items-center `}>
      <View className={` w-full`}>
        <View className=" flex  flex-row items-center justify-between ">
          <View className={`flex flex-row items-center`}>
            <View className="border-2 border-primary rounded-full p-[.8px] mr-4">
              <TouchableOpacity onPress={() => router.push("/(tabs)/account")}>
                <Image
                  source={avatorImage}
                  className={`w-14 h-14 rounded-full `}
                />
              </TouchableOpacity>
            </View>

            <View className={`flex flex-col `}>
              <Text className={`text-xl font-semibold text-gray-800`}>
                Hanad Mohamed
              </Text>
              <View className="flex flex-row items-center gap-2">
                <Text className={`  text-gray-500`}>C120057</Text>
                <Copy size={13} color="#6b7280" strokeWidth={1.5} />
              </View>
            </View>
          </View>
          <Bell size={24} color="black" />
        </View>
      </View>
    </View>
  );
}
