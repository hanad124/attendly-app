import { View, Text, Image } from "react-native";
import React from "react";

import { Bell } from "lucide-react-native";

import avatorImage from "@/assets/images/avator-img.jpg";

export default function Avator() {
  return (
    <View className={` flex flex-row items-center `}>
      <View className={` w-full`}>
        <View className=" flex  flex-row items-center justify-between ">
          <View className={`flex flex-row items-center `}>
            <Image
              source={avatorImage}
              className={`w-16 h-16 rounded-full mr-4`}
            />

            <View className={`flex flex-col `}>
              <Text className={`text-lg font-semibold text-gray-800 mb-1`}>
                Mohamed Abdirahman
              </Text>
              <Text className={`text-base text-gray-600`}>
                +252 61 123 4567
              </Text>
            </View>
          </View>
          <Bell size={24} color="black" />
        </View>
      </View>
    </View>
  );
}
