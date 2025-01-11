import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View, Text, ScrollView, Pressable, Animated } from "react-native";
import { User2, Clock } from "lucide-react-native";
import { weekDays } from "@/data/scheduleData";
import { useGetSchedulesQuery } from "@/stores/RTK/periods";
import { LinearGradient } from "expo-linear-gradient";

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(weekDays[0].id);
  const [expandedPeriod, setExpandedPeriod] = useState<number | null>(null);
  const [shimmerValue] = useState(new Animated.Value(0));

  const { data: schedules, isLoading } = useGetSchedulesQuery({
    params: {
      limit: 10,
      page: 1,
      populate: [
        { path: "class_id" },
        { path: "course_id" },
        { path: "lecturer_id" },
        { path: "semester_id" },
      ],
    },
  });

  const getWeekDayId = (day: string) => {
    const dayMap: { [key: string]: number } = {
      Saturday: 1,
      Sunday: 2,
      Monday: 3,
      Tuesday: 4,
      Wednesday: 5,
      Thursday: 6,
      Friday: 7,
    };
    return dayMap[day] || 1;
  };

  interface Schedule {
    day: string;
    course_id: {
      name: string;
    };
    lecturer_id: {
      firstName: string;
      lastName: string;
    };
    from: string;
    to: string;
    type: string;
  }

  const formatScheduleData = useCallback((scheduleData: Schedule[]) => {
    // Group schedules by day
    const schedulesByDay = scheduleData.reduce<{ [key: string]: Schedule[] }>(
      (acc, schedule) => {
        const day = schedule.day;
        if (!acc[day]) {
          acc[day] = [];
        }
        acc[day].push(schedule);
        return acc;
      },
      {}
    );

    // Format each day's schedules with IDs starting from 1
    const formattedData = Object.entries(schedulesByDay).flatMap(
      ([day, daySchedules]) => {
        return daySchedules.map((schedule, index) => {
          const weekDayId = getWeekDayId(schedule.day);
          return {
            id: index + 1,
            weekDay: weekDayId,
            subject: schedule.course_id.name,
            professor: `${schedule.lecturer_id.firstName} ${schedule.lecturer_id.lastName}`,
            startTime: schedule.from,
            endTime: schedule.to,
            type: schedule.type,
            rawData: schedule,
          };
        });
      }
    );

    return formattedData;
  }, []);

  const filteredPeriods = useMemo(() => {
    if (!schedules?.data?.results) return [];
    const formattedData = formatScheduleData(schedules.data.results);
    const filtered = formattedData.filter((period) => {
      return period.weekDay === activeDay;
    });
    return filtered;
  }, [activeDay, schedules, formatScheduleData]);

  const expandFirstPeriod = useCallback(() => {
    if (filteredPeriods.length > 0) {
      setExpandedPeriod(filteredPeriods[0].id);
    } else {
      setExpandedPeriod(null);
    }
  }, [filteredPeriods]);

  useEffect(() => {
    expandFirstPeriod();
  }, [activeDay, expandFirstPeriod]);

  useEffect(() => {
    const startShimmerAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    if (isLoading) {
      startShimmerAnimation();
    }
  }, [isLoading, shimmerValue]);

  const translateX = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  const handleDayPress = useCallback((dayId: number) => {
    setActiveDay(dayId);
  }, []);

  const handlePeriodPress = useCallback((id: number) => {
    setExpandedPeriod((prevId) => (prevId === id ? null : id));
  }, []);

  const renderPeriodDetails = useCallback(
    (period: any) => (
      <View className="bg-primary/10 border-[.5px] border-primary rounded-lg p-4 space-y-3">
        <Text className="text-primary text-lg font-semibold">
          {period.subject}
        </Text>
        <View className="space-y-2">
          <View className="flex-row items-center">
            <User2 size={16} color="#1F5FD9" />
            <Text className="text-primary/90 ml-2 font-normal text-lg">
              {period.professor}
            </Text>
          </View>

          <View className="flex-row items-center mt-2">
            <Clock size={16} color="#1F5FD9" />
            <Text className="text-primary/90 ml-2 text-sm">
              {period.startTime} - {period.endTime}
            </Text>
          </View>
        </View>
      </View>
    ),
    []
  );

  return (
    <View className="flex-1 mt-6 px-4">
      {/* Weekdays Navigation */}
      <View className="h-auto py-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          className="w-full"
        >
          <View className="flex-row w-full gap-2">
            {weekDays.map((day) => (
              <Pressable
                key={day.id}
                onPress={() => handleDayPress(day.id)}
                className={`px-6 py-2.5 rounded-lg flex-1 w-full ${
                  activeDay === day.id ? "bg-primary" : "bg-gray-200"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    activeDay === day.id ? "text-white" : "text-gray-700"
                  }`}
                >
                  {day.day}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Timeline Section */}
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        <View className="relative">
          {isLoading ? (
            // Loading Skeleton with Shimmer
            <>
              {[1, 2, 3].map((index) => (
                <View key={index} className="flex-row mb-8 overflow-hidden">
                  <View className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <Animated.View
                      style={{
                        width: "100%",
                        height: "100%",
                        transform: [{ translateX }],
                      }}
                    >
                      <LinearGradient
                        colors={[
                          "transparent",
                          "rgba(255,255,255,0.3)",
                          "transparent",
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Animated.View>
                  </View>
                  <View className="flex-1 ml-4">
                    <View className="h-20 bg-gray-200 rounded-lg overflow-hidden">
                      <Animated.View
                        style={{
                          width: "100%",
                          height: "100%",
                          transform: [{ translateX }],
                        }}
                      >
                        <LinearGradient
                          colors={[
                            "transparent",
                            "rgba(255,255,255,0.3)",
                            "transparent",
                          ]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </Animated.View>
                    </View>
                  </View>
                </View>
              ))}
            </>
          ) : (
            <>
              {filteredPeriods.length > 0 && (
                <View className="absolute left-[19px] top-6 bottom-0 w-[1.6px] bg-gray-200/80" />
              )}

              {filteredPeriods.length > 0 ? (
                filteredPeriods.map((period) => (
                  <Pressable
                    key={`${activeDay}-${period.id}`}
                    onPress={() => handlePeriodPress(period.id)}
                    className="flex-row mb-8"
                  >
                    <View
                      className={`w-10 h-10 rounded-full ${
                        expandedPeriod === period.id
                          ? "bg-primary"
                          : "bg-transparent border border-primary"
                      } items-center justify-center z-10`}
                    >
                      <Text
                        className={`${
                          expandedPeriod === period.id
                            ? "text-white"
                            : "text-primary"
                        } font-medium`}
                      >
                        {period.id}
                      </Text>
                    </View>

                    <View className="flex-1 ml-4 ">
                      {expandedPeriod === period.id ? (
                        renderPeriodDetails(period)
                      ) : (
                        <>
                          <View className="mt-2 ">
                            <Text className="text-gray-600 font-normal ">
                              {period.startTime} - {period.endTime}
                            </Text>
                          </View>
                        </>
                      )}
                    </View>

                    {expandedPeriod === period.id && (
                      <Pressable className="w-10 h-10 rounded-full bg-[#00BCD4] items-center justify-center ml-2 mt-10">
                        <User2 size={20} color="white" />
                      </Pressable>
                    )}
                  </Pressable>
                ))
              ) : (
                <View className="py-10">
                  <Text className="text-gray-400 text-center">
                    No classes scheduled for{" "}
                    {weekDays.find((d) => d.id === activeDay)?.fullName}
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
