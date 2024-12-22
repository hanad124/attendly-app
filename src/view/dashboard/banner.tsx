import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

import bannerImage from "@/assets/images/dashboard-banner-img.png";

export default function DashboardBanner() {
  return (
    <View className={` mt-6 `}>
      <View className="bg-primary w-full p-4 rounded-xl relative overflow-hidden">
        <View className="flex flex-row items-center justify-between ">
          <View>
            <Text className="text-xl font-semibold text-white mb-2">
              Somali Cultural Festival
            </Text>
            <Text className="text-white/90 my-1">A Week of Heritage at</Text>
            <Text className="text-white/90 my-1">Jamhuriya University</Text>
            <View className="flex flex-row relative z-10">
              <TouchableOpacity className="bg-white p-3 px-10 rounded-lg mt-4  w-fit flex-2">
                <Text className="text-primary text-lg font-semibold">
                  Read more
                </Text>
              </TouchableOpacity>
              <View></View>
            </View>
          </View>
          <View className="absolute right-0 bg-blue-200/20 rounded-full opacity-50 scale-125 w-[14rem] h-[14rem]" />

          <View className="absolute right-0 bg-blue-300/30 rounded-full opacity-50 scale-120 w-[14rem] h-[14rem]" />
          <Image
            source={bannerImage}
            className={`absolute -bottom-[8.5rem] -right-10  min-h-full h-[26rem] w-[16rem]`}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}
