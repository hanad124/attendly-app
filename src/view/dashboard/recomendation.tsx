import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ChevronRight, Monitor } from "lucide-react-native";

export default function Recomendation() {
  return (
    <View className={` mt-6 `}>
      <View className="flex flex-row items-center justify-between mb-1 ">
        <Text className="text-lg font-medium text-gray-800 mb-1 text-left">
          Offers for you
        </Text>
        <TouchableOpacity className="flex flex-row items-center gap-1 ">
          <Text className="text-primary text-sm font-medium">See All</Text>
          <ChevronRight size={24} color="#1F5FD9" />
        </TouchableOpacity>
      </View>

      <View className="flex flex-row items-center gap-14 mt-3 w-full">
        <View className=" border border-gray-200 rounded-xl p-4 px-6 w-full">
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
            <View className="text-center border border-gray-200 rounded-full py-1 px-5">
              <Text className="text-primary font-medium">Monthly</Text>
            </View>
          </View>
          <View className="mt-2 flex flex-row items-center justify-between">
            <View className="">
              <View className="flex flex-row items-center gap-1 mt-1 justify-between w-full">
                <View>
                  <Text className="text-secondary font-medium">Anfac Plus</Text>
                  <View className="flex flex-row items-center gap-1">
                    <Text className="text-secondary text-xl font-bold">30</Text>
                    <Text className="text-secondary/50">GB</Text>
                  </View>
                </View>
                <Text className="text-secondary text-3xl font-normal">$23</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity className="bg-primary py-[.7rem] px-4 rounded-lg mt-4 w-full">
            <Text className="text-white text-lg font-semibold text-center">
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
