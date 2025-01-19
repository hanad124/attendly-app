import { View, Text } from "react-native";
import React from "react";
import Avator from "./Avator";
import { Animated } from 'react-native';
import {  Percent, CircleCheckBig, School, CircleX } from "lucide-react-native";

import { useAttendanceStatsQuery } from "@/stores/RTK/attendance";
import { useAuthStore } from "@/stores/auth";

const LoadingSkeleton = () => {
  const pulseAnim = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    const pulse = Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 0.3,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulse).start();
  }, []);

  return (
    <View className="mt-10 bg-primary w-full p-4 rounded-xl">
      <View className="flex flex-row items-center justify-between">
        <Animated.View style={{ opacity: pulseAnim }} className="bg-white/20 h-6 w-32 rounded" />
      </View>
      
      <View className="mt-4 flex flex-row items-center gap-5">
        <Animated.View style={{ opacity: pulseAnim }} className="bg-white/20 w-10 h-10 rounded-full" />
        <View className="flex-1">
          <View className="flex flex-row items-center justify-between">
            <Animated.View style={{ opacity: pulseAnim }} className="bg-white/20 h-5 w-24 rounded" />
            <Animated.View style={{ opacity: pulseAnim }} className="bg-white/20 h-5 w-8 rounded" />
          </View>
          <Animated.View style={{ opacity: pulseAnim }} className="mt-2 bg-white/20 h-[.3rem] w-full rounded-full" />
        </View>
      </View>

      <View className="h-px border-[.8px] border-dashed border-white/20 my-6" />
      
      <View className="flex flex-row items-center justify-between">
        {[1, 2, 3].map((_, index) => (
          <View key={index} className="flex flex-row items-center gap-2">
            <Animated.View style={{ opacity: pulseAnim }} className="bg-white/20 w-8 h-8 rounded-full" />
            <View className="flex flex-row items-center gap-1">
              <Animated.View style={{ opacity: pulseAnim }} className="bg-white/20 h-5 w-6 rounded" />
              <Animated.View style={{ opacity: pulseAnim }} className="bg-white/20 h-4 w-12 rounded" />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default function DashboardHeader() {
  const { user } = useAuthStore();

  const student_id = user.id
  const semester = user.semester.id as any

  const { data: stats, isLoading } = useAttendanceStatsQuery({
    studentId: student_id,
    semesterId: semester
  });

  


  if (isLoading) {
    return (
      <View>
        <Avator />
        <LoadingSkeleton />
      </View>
    );
  }

  return (
    <View>
      <Avator />
      <View className="mt-10 bg-primary w-full p-4 rounded-xl">
        <View className="flex flex-row items-center justify-between ">
          <Text className="text-xl font-normal text-white/70">
            Attendance Rate
          </Text>
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
                <Text className="text-white text-xl font-medium">{stats?.total_sessions || 0}</Text>
              </View>
            </View>
            <View>
              <View className="mt-2 bg-white/20 rounded-full h-[.3rem] overflow-hidden">
                <View
                  className="bg-yellow-400 h-full"
                  style={{
                    width: `${stats?.attendance_percentage || 0}%`, 
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
              <Text className="text-white font-medium">{stats?.sessions_attended || 0}</Text>
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
              <Text className="text-white font-medium">{(stats?.total_sessions || 0) - (stats?.sessions_attended || 0)}</Text>
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
                {stats?.attendance_percentage || 0}
              </Text>
              <Text className="text-white/50">Rate</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
