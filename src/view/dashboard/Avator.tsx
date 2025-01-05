import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";

import { useRouter } from "expo-router";

import { Bell, Copy } from "lucide-react-native";

import avatorImage from "@/assets/images/avator-img.jpg";
import { useAuthStore } from "@/stores/auth";


export default function Avator() {
  const user = useAuthStore((state) => state.user)

 


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
                {user?.firstName} {user?.lastName}
              </Text>
              <View className="flex flex-row items-center gap-2">
                <Text className={`  text-gray-500`}>{user?.username}</Text>
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
