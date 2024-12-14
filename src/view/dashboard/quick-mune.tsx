import { View, Text, Image } from "react-native";
import React from "react";
import { Grid2X2Plus, Monitor, Send, Wifi } from "lucide-react-native";

export default function QuickMune() {
  return (
    <View className={` mt-10 `}>
      <Text className="text-lg font-medium text-gray-800 mb-1 text-left">
        Quick Mune
      </Text>
      <View className="flex flex-row items-center gap-8 mt-3">
        <View className="flex flex-col gap-2">
          <View className=" border border-gray-200 rounded-full p-4">
            <Monitor
              size={24}
              color="#1F5FD9"
              className=" w-10 h-10"
              width={24}
              height={24}
            />
          </View>
          <Text className="text-secondary text-sm">Internet</Text>
        </View>
        <View className="flex flex-col gap-2">
          <View className=" border border-gray-200 rounded-full p-4">
            <Send
              size={24}
              color="#1F5FD9"
              className=" w-10 h-10"
              width={24}
              height={24}
            />
          </View>
          <Text className="text-secondary text-sm">Send Gift</Text>
        </View>
        <View className="flex flex-col gap-2">
          <View className=" border border-gray-200 rounded-full p-4">
            <Wifi
              size={24}
              color="#1F5FD9"
              className=" w-10 h-10"
              width={24}
              height={24}
            />
          </View>
          <Text className="text-secondary text-sm">Test Speed</Text>
        </View>
        <View className="flex flex-col gap-2">
          <View className=" border border-gray-200 rounded-full p-4">
            <Grid2X2Plus
              size={24}
              color="#1F5FD9"
              className=" w-10 h-10"
              width={24}
              height={24}
            />
          </View>
          <Text className="text-secondary text-sm">More</Text>
        </View>
      </View>
    </View>
  );
}
