import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { User2, MapPin, BookOpen, Clock } from "lucide-react-native";
import { weekDays, periods } from "@/data/scheduleData";

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(1);
  const [expandedPeriod, setExpandedPeriod] = useState<number | null>(null);

  const filteredPeriods = useMemo(() => 
    periods.filter(period => period.weekDay === activeDay),
    [activeDay]
  );

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
    setExpandedPeriod(prevId => prevId === id ? null : id);
  }, []);

  const renderPeriodDetails = useCallback((period: typeof periods[0]) => (
    <View className="bg-primary/10 border-[.5px] border-primary rounded-xl p-4 space-y-3">
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
  ), []);

  return (
    <View className="flex-1 mt-6">
     

      {/* Weekdays Navigation */}
      <View className="h-auto py-4 ">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          <View className="flex-row gap-2">
            {weekDays.map((day) => (
              <Pressable
                key={day.id}
                onPress={() => handleDayPress(day.id)}
                className={`px-6 py-2.5 rounded-lg ${
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
                <View className="w-10 h-10 rounded-full bg-primary items-center justify-center z-10">
                  <Text className="text-white font-medium">
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
                No classes scheduled for {weekDays.find(d => d.id === activeDay)?.fullName}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

