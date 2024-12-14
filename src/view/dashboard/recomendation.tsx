import { View, Text, Image } from "react-native";
import React from "react";
import { Monitor } from "lucide-react-native";

export default function Recomendation() {
  return (
    <View className={` mt-10 `}>
      <Text className="text-lg font-medium text-gray-800 mb-1 text-left">
        Recomendation
      </Text>

      <View className="flex flex-row items-center gap-14 mt-3 w-full">
        <View className=" border border-gray-200 rounded-xl p-4 w-full">
          <View className="flex flex-row items-center justify-between">
            <View className=" border border-gray-200 rounded-full p-4">
              <Monitor
                size={20}
                color="#1F5FD9"
                className=" w-10 h-10"
                width={20}
                height={20}
              />
            </View>

            <View className="flex flex-row items-center gap-1">
              <Text className="text-secondary text-2xl font-bold">30</Text>
              <Text className="text-secondary/50">GB</Text>
            </View>
          </View>
          <View className="mt-2 flex flex-row items-center justify-between">
          <View className="">
            <Text className="text-secondary text-lg font-medium">
              Anfac Plus
            </Text>
            <View className="flex flex-row items-center gap-1 mt-1">
              <Text className="text-secondary text-2xl font-bold">30</Text>
              <Text className="text-secondary/50">GB</Text>
            </View>
            <Text className="text-secondary text-3xl font-bold mt-3">$23</Text>
          </View>
            <View className="py-2 px-4 bg-primary rounded-full">
                <Text className="text-white">Monthly</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
