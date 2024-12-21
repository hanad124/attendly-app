import { View, Text, Image } from "react-native";
import React from "react";
import Avator from "./Avator";

import { Globe, Monitor, Phone, MessageSquareMore } from "lucide-react-native";

import logo from "@/assets/images/providers/amtel-logo.png";

export default function DashboardHeader() {
  return (
    <View>
      <Avator />
      <View className="mt-10 bg-primary w-full p-4 rounded-xl">
        <View className="flex flex-row items-center justify-between ">
          <Text className="text-xl font-normal text-white/70">
            Package Details
          </Text>
          <Image source={logo} className={`w-12 h-12 rounded-full mr-4`} />
        </View>
        <View className="mt-4 flex flex-row items-center gap-5">
          <View className="bg-blue-400/30 w-fit max-w-fit rounded-full p-2">
            <Globe
              size={24}
              color="white"
              className=" w-10 h-10"
              width={24}
              height={24}
            />
          </View>
          <View className="flex-1">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-white text-xl font-normal">Internet</Text>
              <View className="flex flex-row items-center gap-1">
                <Text className="text-white">16</Text>
                <Text className="text-white/50">GB</Text>
              </View>
            </View>
            <View>
              <View className="mt-2 bg-white/20 rounded-full h-2 overflow-hidden">
                <View
                  className="bg-yellow-400 h-full"
                  style={{
                    width: `${(30 / 50) * 100}%`, // 50 GB total data plan
                    borderRadius: 999,
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <View className="h-px border-[.8px] border-dashed border-white/20 my-6" />
        <View className="flex flex-row items-center justify-between ">
          <View className="flex flex-row items-center gap-2">
            <View className="bg-blue-400/30 w-fit max-w-fit rounded-full p-2">
              <Monitor
                size={24}
                color="white"
                className=" w-10 h-10"
                width={24}
                height={24}
              />
            </View>
            <View className="flex flex-row items-center gap-1">
              <Text className="text-white">30</Text>
              <Text className="text-white/50">Days</Text>
            </View>
          </View>
          <View className="flex flex-row items-center gap-2">
            <View className="bg-blue-400/30 w-fit max-w-fit rounded-full p-2">
              <Phone
                size={24}
                color="white"
                className=" w-10 h-10"
                width={24}
                height={24}
              />
            </View>
            <View className="flex flex-row items-center gap-1">
              <Text className="text-white">26</Text>
              <Text className="text-white/50">Min</Text>
            </View>
          </View>
          <View className="flex flex-row items-center gap-2">
            <View className="bg-blue-400/30 w-fit max-w-fit rounded-full p-2">
              <MessageSquareMore
                size={24}
                color="white"
                className=" w-10 h-10"
                width={24}
                height={24}
              />
            </View>
            <View className="flex flex-row items-center gap-1">
              <Text className="text-white">70</Text>
              <Text className="text-white/50">Min</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
