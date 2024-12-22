import { View, Text, Image } from "react-native";
import React from "react";
import Avator from "./Avator";

import {  Percent, MessageSquareMore, CircleCheckBig, School, CircleX } from "lucide-react-native";

import logo from "@/assets/images/providers/amtel-logo.png";

export default function DashboardHeader() {
  return (
    <View>
      <Avator />
      <View className="mt-10 bg-primary w-full p-4 rounded-xl">
        <View className="flex flex-row items-center justify-between ">
          <Text className="text-xl font-normal text-white/70">
            Attendance Rate
          </Text>
          {/* <Image source={logo} className={`w-12 h-12 rounded-full mr-4`} /> */}
        </View>
        <View className="mt-4 flex flex-row items-center gap-5">
          <View className="bg-blue-400/30 w-fit max-w-fit rounded-full p-2">
            <School
              size={24}
              color="white"
              className=" w-10 h-10"
              width={24}
              height={24}
            />
          </View>
          <View className="flex-1">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-white text-lg font-normal">Total Periods</Text>
              <View className="flex flex-row items-center gap-1">
                <Text className="text-white text-xl font-medium">16</Text>
                {/* <Text className="text-white/50">GB</Text> */}
              </View>
            </View>
            <View>
              <View className="mt-2 bg-white/20 rounded-full h-[.3rem] overflow-hidden">
                <View
                  className="bg-yellow-400 h-full"
                  style={{
                    width: `${(30 / 50) * 100}%`, 
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
              <CircleCheckBig
                size={20}
                color="white"
                className=" w-8 h-8"
                width={20}
                height={20}
              />
            </View>
            <View className="flex flex-row items-center gap-1">
              <Text className="text-white font-medium">11</Text>
              <Text className="text-white/50">Present</Text>
            </View>
          </View>
          <View className="flex flex-row items-center gap-2">
            <View className="bg-blue-400/30 w-fit max-w-fit rounded-full p-2">
              <CircleX
                size={20}
                color="white"
                className=" w-8 h-8"
                width={20}
                height={20}
              />
            </View>
            <View className="flex flex-row items-center gap-1">
              <Text className="text-white font-medium">5</Text>
              <Text className="text-white/50">Absent</Text>
            </View>
          </View>
          <View className="flex flex-row items-center gap-2">
            <View className="bg-blue-400/30 w-fit max-w-fit rounded-full p-2">
              <Percent
                size={20}
                color="white"
                className=" w-8 h-8"
                width={20}
                height={20}
              />
            </View>
            <View className="flex flex-row items-center gap-1">
              <Text className="text-white">
                75
              </Text>
              <Text className="text-white/50">Rate</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
