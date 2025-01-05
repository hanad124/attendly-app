import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { User2, Clock } from "lucide-react-native";
import { weekDays } from "@/data/scheduleData";
import { useGetSchedulesQuery } from "@/stores/RTK/apiSlice";

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(weekDays[0].id);
  const [expandedPeriod, setExpandedPeriod] = useState<number | null>(null);

  const { data: schedules, error, isLoading } = useGetSchedulesQuery({
    params: {
      limit: 10,
      page: 1,
      populate: [
        { path: 'class_id' },
        { path: 'course_id' },
        { path: 'lecturer_id' },
        { path: 'semester_id' },
      ]
    }
  });

  const getWeekDayId = (day: string) => {
    const dayMap: { [key: string]: number } = {
      'Saturday': 1,
      'Sunday': 2,
      'Monday': 3,
      'Tuesday': 4,
      'Wednesday': 5,
      'Thursday': 6,
      'Friday': 7
    };
    console.log('Day from API:', day);
    console.log('Mapped day ID:', dayMap[day] || 1);
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
    const schedulesByDay = scheduleData.reduce<{ [key: string]: Schedule[] }>((acc, schedule) => {
      const day = schedule.day;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(schedule);
      return acc;
    }, {});

    // Format each day's schedules with IDs starting from 1
    const formattedData = Object.entries(schedulesByDay).flatMap(([day, daySchedules]) => {
      return daySchedules.map((schedule, index) => {
        const weekDayId = getWeekDayId(schedule.day);
        return {
          id: index + 1, // ID starts from 1 for each day
          weekDay: weekDayId,
          subject: schedule.course_id.name,
          professor: `${schedule.lecturer_id.firstName} ${schedule.lecturer_id.lastName}`,
          startTime: schedule.from,
          endTime: schedule.to,
          type: schedule.type,
          rawData: schedule
        };
      });
    });

    return formattedData;
  }, []);

  const filteredPeriods = useMemo(() => {
    if (!schedules?.data?.results) return [];
    const formattedData = formatScheduleData(schedules.data.results);
    const filtered = formattedData.filter((period) => {
      console.log('Filtering period:', {
        periodWeekDay: period.weekDay,
        activeDay,
        matches: period.weekDay === activeDay
      });
      return period.weekDay === activeDay;
    });
    console.log('Filtered periods:', filtered);
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
        </View>
      </ScrollView>
      
    </View>
  );
}
