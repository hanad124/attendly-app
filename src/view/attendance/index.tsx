import {
  ActivityIndicator,
  Text,
  View,
  Animated,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import { format, subDays, isWithinInterval } from "date-fns";
import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  useAttendanceStatsQuery,
  useGetAttendanceVerificationsQuery,
} from "@/stores/RTK/attendance";
import { useAuthStore } from "@/stores/auth";
import { Platform } from "react-native";

const StatCard = ({ title, value, icon, color }: any) => (
  <View className="bg-white rounded-xl p-4 flex-1 mx-1 border-[.5px] border-gray-200/80">
    <View className="flex-row items-center justify-between">
      <Text className="text-gray-600 text-sm">{title}</Text>
      <View
        style={{ backgroundColor: `${color}20` }}
        className="p-2 rounded-full"
      >
        {icon}
      </View>
    </View>
    <Text className="text-2xl font-bold mt-2">{value}</Text>
  </View>
);

const VerificationItem = ({
  verification,
  isLast,
}: {
  verification: any;
  isLast: boolean;
}) => {
  const { verification_status, scan_time, verification_details, device_info } =
    verification;
  const scanDate = format(new Date(scan_time), "MMM dd, yyyy");
  const scanTime = format(new Date(scan_time), "h:mm a");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return "bg-green-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <View className="flex-row ">
      <View className="mr-3 items-center">
        <View
          className={`w-2.5 h-2.5 rounded-full ${getStatusColor(
            verification_status
          )}`}
        />
        {!isLast && <View className="w-0.5 h-16 bg-gray-200 -mt-1" />}
      </View>
      <View className="flex-1 mb-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Text className="text-base font-medium">{scanDate}</Text>
            <Text className="text-xs text-gray-500 ml-2">{scanTime}</Text>
          </View>
          <View
            className={`px-2 py-0.5 rounded-full ${getStatusColor(
              verification_status
            )} bg-opacity-10`}
          >
            <Text
              className={`text-xs ${
                verification_status.toLowerCase() === "success"
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {verification_status}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center mt-1">
          <View className="flex-row items-center mr-3">
            <Feather name="smartphone" size={14} color="#6b7280" />
            <Text className="text-xs text-gray-500 ml-1">
              {device_info.device_id}
            </Text>
          </View>
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="map-marker-distance"
              size={14}
              color="#6b7280"
            />
            <Text className="text-xs text-gray-500 ml-1">
              {verification_details.distance_from_target.toFixed(1)}m away
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

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
    <View className="flex-1 p-4 ">
      {/* Stats Cards Skeleton */}
      <View className="flex-row mb-4">
        {[1, 2].map((_, index) => (
          <View
            key={index}
            className="flex-1 mx-1 bg-white rounded-xl p-4 shadow-sm"
          >
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
          <View
            key={index}
            className="flex-1 mx-1 bg-white rounded-xl p-4 shadow-sm"
          >
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

const VerificationHistory = ({ verifications, isLoading }: { verifications: any[], isLoading: boolean }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({
    startDate: subDays(new Date(), 30),
    endDate: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerType, setDatePickerType] = useState<'start' | 'end'>('start');
  const itemsPerPage = 5;

  // Filter verifications by date range
  const filteredVerifications = verifications?.filter((verification) => {
    const scanDate = new Date(verification.scan_time);
    return isWithinInterval(scanDate, {
      start: dateRange.startDate,
      end: dateRange.endDate,
    });
  }) || [];

  // Calculate pagination
  const totalPages = Math.ceil(filteredVerifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVerifications = filteredVerifications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || (datePickerType === 'start' ? dateRange.startDate : dateRange.endDate);
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDateRange(prev => ({
        ...prev,
        [datePickerType === 'start' ? 'startDate' : 'endDate']: currentDate
      }));
    }
  };

  const showDatePickerModal = (type: 'start' | 'end') => {
    setDatePickerType(type);
    setShowDatePicker(true);
  };

  const DateFilterButton = ({ date, type }: { date: Date, type: 'start' | 'end' }) => (
    <TouchableOpacity
      onPress={() => showDatePickerModal(type)}
      className="flex-row items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
    >
      <MaterialIcons name="calendar-today" size={16} color="#6366f1" />
      <Text className="ml-2 text-sm text-gray-700">
        {format(date, 'MMM dd, yyyy')}
      </Text>
    </TouchableOpacity>
  );

  const PaginationButton = ({ 
    onPress, 
    disabled, 
    children 
  }: { 
    onPress: () => void, 
    disabled: boolean, 
    children: React.ReactNode 
  }) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`px-3 py-1 rounded-lg flex-row items-center ${
        disabled ? 'opacity-50' : ''
      }`}
    >
      {children}
    </TouchableOpacity>
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#6366f1" />;
  }

  return (
    <View>
      {/* Date Filter */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center gap-2">
          <DateFilterButton date={dateRange.startDate} type="start" />
          <Text className="text-gray-500">to</Text>
          <DateFilterButton date={dateRange.endDate} type="end" />
        </View>
      </View>

      {/* Verifications List */}
      {filteredVerifications.length > 0 ? (
        <View className="border-[.5px] border-gray-200/80 p-4 rounded-lg">
          {paginatedVerifications.map((verification: any, index: number) => (
            <VerificationItem
              key={verification.id}
              verification={verification}
              isLast={index === paginatedVerifications.length - 1}
            />
          ))}

          {/* Pagination Controls */}
          <View className="flex-row items-center justify-between mt-6 pt-6 border-t border-gray-100 mb-2">
            <PaginationButton
              onPress={() => setCurrentPage(prev => prev - 1)}
              disabled={currentPage === 1}
            >
              <Feather
                name="chevron-left"
                size={20}
                color={currentPage === 1 ? '#9CA3AF' : '#6366f1'}
              />
              <Text className={`ml-1 ${currentPage === 1 ? 'text-gray-400' : 'text-indigo-600'}`}>
                Previous
              </Text>
            </PaginationButton>

            <View className="bg-gray-50 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </Text>
            </View>

            <PaginationButton
              onPress={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage === totalPages}
            >
              <Text className={`mr-1 ${
                currentPage === totalPages ? 'text-gray-400' : 'text-indigo-600'
              }`}>
                Next
              </Text>
              <Feather
                name="chevron-right"
                size={20}
                color={currentPage === totalPages ? '#9CA3AF' : '#6366f1'}
              />
            </PaginationButton>
          </View>
        </View>
      ) : (
        <Text className="text-gray-500 text-center">
          No verifications found for the selected date range
        </Text>
      )}

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={datePickerType === 'start' ? dateRange.startDate : dateRange.endDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

const AttendanceStates = () => {
  const { user } = useAuthStore();

  const student_id = user?.id;
  const semester = user?.semester?.id as any;

  const { data: stats, isLoading } = useAttendanceStatsQuery({
    studentId: student_id,
    semesterId: semester,
  });

  const { data: verifications, isLoading: isVerificationsLoading } =
    useGetAttendanceVerificationsQuery({
      student_id: student_id,
    });

  if (isLoading) return <LoadingSkeleton />;

  if (!stats) return <Text>No attendance data available</Text>;

  const lastAttendanceDate = stats?.last_attendance_date
    ? format(new Date(stats?.last_attendance_date), "MMM dd, yyyy")
    : "N/A";

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="p-3 pb-24">
        {/* Main Stats */}
        <View className="flex-row mb-4">
          <StatCard
            title="Attendance Rate"
            value={`${stats.attendance_percentage}%`}
            icon={
              <MaterialCommunityIcons
                name="percent"
                size={24}
                color="#6366f1"
              />
            }
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
            icon={
              <MaterialCommunityIcons name="fire" size={24} color="#f59e0b" />
            }
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
        <View className="bg-white rounded-xl p-4  border-[.5px] border-gray-200/80 mb-4">
          <LinearGradient
            colors={["rgba(99, 102, 241, 0.1)", "rgba(99, 102, 241, 0.05)"]}
            className="absolute top-0 left-0 right-0 bottom-0 rounded-xl"
          />
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-gray-600 mb-1">Last Attendance</Text>
              <Text className="text-lg font-semibold">
                {lastAttendanceDate}
              </Text>
            </View>
            <View className="bg-indigo-100 p-3 rounded-full">
              <MaterialCommunityIcons
                name="clock-check-outline"
                size={24}
                color="#6366f1"
              />
            </View>
          </View>
        </View>

        {/* Verification History */}
        <View className="mb-24">
          <Text className="text-lg font-semibold mb-3">
            Verification History
          </Text>
          <VerificationHistory 
            verifications={verifications || []} 
            isLoading={isVerificationsLoading} 
          />
        </View>

        {/* Achievements Section */}
        {stats.achievements && stats.achievements.length > 0 ? (
          <View className="bg-white rounded-xl p-4  ">
            <Text className="text-lg font-semibold mb-3">Achievements</Text>
            <View className="flex-row flex-wrap">
              {stats.achievements.map((achievement: string, index: number) => (
                <View
                  key={index}
                  className="bg-gray-100 rounded-full px-3 py-1 mr-2 mb-2"
                >
                  <Text className="text-sm text-gray-700">{achievement}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default AttendanceStates;
