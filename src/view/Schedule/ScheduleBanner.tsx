import React from "react";
import { View, Text } from "react-native";
import { Calendar } from "lucide-react-native";
import { Svg, Defs, Rect, Pattern, Circle, Path } from "react-native-svg";

export default function ScheduleBanner() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'short' });
  const year = currentDate.getFullYear();
  const weekday = currentDate.toLocaleString('default', { weekday: 'long' });

  return (
    <View className="mt-4 px-8">
      <View className="w-full h-40 rounded-xl shadow-lg relative overflow-hidden">
        <Svg width="100%" height="100%" className="absolute inset-0">
          <Defs>
            <Pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <Path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
            </Pattern>
            <Pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <Rect width="50" height="50" fill="url(#smallGrid)"/>
              <Path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
            </Pattern>
          </Defs>
          <Rect width="100%" height="100%" fill="#1F5FD9" />
          <Rect width="100%" height="100%" fill="url(#grid)" />
          <Circle cx="10%" cy="20%" r="60" fill="rgba(255,255,255,0.1)" />
          <Circle cx="90%" cy="80%" r="100" fill="rgba(255,255,255,0.07)" />
        </Svg>
        <View className="absolute inset-0 p-6">
          <View className="flex-row items-center justify-between h-full">
            <View className="flex-1">
              <Text className="text-4xl font-bold text-white tracking-tight">
                {`${day} ${month}`}
              </Text>
              <Text className="text-xl text-white/90 mt-1 font-medium">
                {weekday}
              </Text>
              <Text className="text-white/70 mt-1 text-lg">
                {year}
              </Text>
            </View>
            
            <View className="bg-white/20 p-4 rounded-full">
              <Calendar size={32} color="#fff" strokeWidth={2} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

