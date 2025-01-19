import { ActivityIndicator, Text, View, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { format } from "date-fns";
import React from "react";

import { useAttendanceStatsQuery } from "@/stores/RTK/attendance";
import { useAuthStore } from "@/stores/auth";

const StatCard = ({ title, value, icon, color }: any) => (
  <View className="bg-white rounded-xl p-4 flex-1 mx-1 shadow-sm">
    <View className="flex-row items-center justify-between">
      <Text className="text-gray-600 text-sm">{title}</Text>
      <View style={{ backgroundColor: `${color}20` }} className="p-2 rounded-full">
        {icon}
      </View>
    </View>
    <Text className="text-2xl font-bold mt-2">{value}</Text>
  </View>
);

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
    <View className="flex-1 p-4">
      {/* Stats Cards Skeleton */}
      <View className="flex-row mb-4">
        {[1, 2].map((_, index) => (
          <View key={index} className="flex-1 mx-1 bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row items-center justify-between">
              <Animated.View
                style={{ opacity: pulseAnim }}
                className="bg-gray-200 h-4 w-20 rounded"
              />
              <Animated.View
                style={{ opacity: pulseAnim }}
                className="bg-gray-200 w-10 h-10 rounded-full"
              />
            </View>
            <Animated.View
              style={{ opacity: pulseAnim }}
              className="bg-gray-200 h-8 w-24 rounded mt-2"
            />
          </View>
        ))}
      </View>

      <View className="flex-row mb-4">
        {[1, 2].map((_, index) => (
          <View key={index} className="flex-1 mx-1 bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row items-center justify-between">
              <Animated.View
                style={{ opacity: pulseAnim }}
                className="bg-gray-200 h-4 w-20 rounded"
              />
              <Animated.View
                style={{ opacity: pulseAnim }}
                className="bg-gray-200 w-10 h-10 rounded-full"
              />
            </View>
            <Animated.View
              style={{ opacity: pulseAnim }}
              className="bg-gray-200 h-8 w-24 rounded mt-2"
            />
          </View>
        ))}
      </View>

      {/* Last Attendance Card Skeleton */}
      <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Animated.View
              style={{ opacity: pulseAnim }}
              className="bg-gray-200 h-4 w-32 rounded mb-2"
            />
            <Animated.View
              style={{ opacity: pulseAnim }}
              className="bg-gray-200 h-6 w-40 rounded"
            />
          </View>
          <Animated.View
            style={{ opacity: pulseAnim }}
            className="bg-gray-200 w-12 h-12 rounded-full"
          />
        </View>
      </View>

      {/* Achievements Section Skeleton */}
      <View className="bg-white rounded-xl p-4 shadow-sm">
        <Animated.View
          style={{ opacity: pulseAnim }}
          className="bg-gray-200 h-6 w-32 rounded mb-3"
        />
        <View className="flex-row flex-wrap">
          {[1, 2, 3].map((_, index) => (
            <Animated.View
              key={index}
              style={{ opacity: pulseAnim }}
              className="bg-gray-200 h-8 w-24 rounded-full mr-2 mb-2"
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const AttendanceStates = () => {
  const { user } = useAuthStore();

  const student_id = user.id;
  const semester = user.semester.id as any;

  const { data: stats, isLoading } = useAttendanceStatsQuery({
    studentId: student_id,
    semesterId: semester,
  });

  if (isLoading) return <LoadingSkeleton />;

  if (!stats) return <Text>No attendance data available</Text>;

  const lastAttendanceDate = stats.last_attendance_date 
    ? format(new Date(stats.last_attendance_date), 'MMM dd, yyyy')
    : 'N/A';

  return (
    <View className="flex-1 p-4">
      {/* Main Stats */}
      <View className="flex-row mb-4">
        <StatCard
          title="Attendance Rate"
          value={`${stats.attendance_percentage}%`}
          icon={<MaterialCommunityIcons name="percent" size={24} color="#6366f1" />}
          color="#6366f1"
        />
        <StatCard
          title="Sessions"
          value={`${stats.sessions_attended}/${stats.total_sessions}`}
          icon={<Ionicons name="calendar" size={24} color="#22c55e" />}
          color="#22c55e"
        />
      </View>

      <View className="flex-row mb-4">
        <StatCard
          title="Streak"
          value={`${stats.attendance_streak} days`}
          icon={<MaterialCommunityIcons name="fire" size={24} color="#f59e0b" />}
          color="#f59e0b"
        />
        <StatCard
          title="Points"
          value={stats.points}
          icon={<FontAwesome5 name="star" size={24} color="#ec4899" />}
          color="#ec4899"
        />
      </View>

      {/* Last Attendance Card */}
      <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <LinearGradient
          colors={['rgba(99, 102, 241, 0.1)', 'rgba(99, 102, 241, 0.05)']}
          className="absolute top-0 left-0 right-0 bottom-0 rounded-xl"
        />
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-gray-600 mb-1">Last Attendance</Text>
            <Text className="text-lg font-semibold">{lastAttendanceDate}</Text>
          </View>
          <View className="bg-indigo-100 p-3 rounded-full">
            <MaterialCommunityIcons name="clock-check-outline" size={24} color="#6366f1" />
          </View>
        </View>
      </View>

      {/* Achievements Section */}
      {stats.achievements && stats.achievements.length > 0 ? (
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <Text className="text-lg font-semibold mb-3">Achievements</Text>
          <View className="flex-row flex-wrap">
            {stats.achievements.map((achievement: string, index: number) => (
              <View key={index} className="bg-gray-100 rounded-full px-3 py-1 mr-2 mb-2">
                <Text className="text-sm text-gray-700">{achievement}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default AttendanceStates;