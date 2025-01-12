import { View, Text, Image, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";

import score1image from "@/assets/images/leader-board/score-1.png";
import score2image from "@/assets/images/leader-board/score-2.png";
import score3image from "@/assets/images/leader-board/score-3.png";
import { useGetLeaderboardQuery } from "@/stores/RTK/leaderboard";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const useShimmerAnimation = () => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [shimmerValue]);

  const getAnimatedStyle = () => ({
    transform: [
      {
        translateX: shimmerValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, 100],
        }),
      },
    ],
    opacity: shimmerValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.3, 0.5, 0.3],
    }),
  });

  return getAnimatedStyle;
};

const HeaderSkeleton = () => {
  const getAnimatedStyle = useShimmerAnimation();

  return (
    <View className="flex flex-row items-center justify-between mb-4">
      <View className="w-48 h-6 bg-gray-200 rounded overflow-hidden">
        <Animated.View
          style={[{ width: "100%", height: "100%", backgroundColor: "#fff" }, getAnimatedStyle()]}
        />
      </View>
      <View className="w-16 h-4 bg-gray-200 rounded overflow-hidden">
        <Animated.View
          style={[{ width: "100%", height: "100%", backgroundColor: "#fff" }, getAnimatedStyle()]}
        />
      </View>
    </View>
  );
};

const LoadingSkeleton = () => {
  const getAnimatedStyle = useShimmerAnimation();

  const SkeletonItem = ({ isTop3 = false }) => (
    <View
      className={`flex-row items-center p-3 ${
        isTop3 ? "bg-primary/5" : ""
      }`}
    >
      <View className="w-8">
        <View className="w-5 h-5 bg-gray-200 rounded-full overflow-hidden">
          <Animated.View
            style={[{ width: "100%", height: "100%", backgroundColor: "#fff" }, getAnimatedStyle()]}
          />
        </View>
      </View>
      <View className="border-2 border-gray-200 rounded-full p-[.8px] overflow-hidden">
        <View className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
          <Animated.View
            style={[{ width: "100%", height: "100%", backgroundColor: "#fff" }, getAnimatedStyle()]}
          />
        </View>
      </View>
      <View className="flex-1 ml-3">
        <View className="w-32 h-4 bg-gray-200 rounded mb-2 overflow-hidden">
          <Animated.View
            style={[{ width: "100%", height: "100%", backgroundColor: "#fff" }, getAnimatedStyle()]}
          />
        </View>
        <View className="w-16 h-3 bg-gray-200 rounded overflow-hidden">
          <Animated.View
            style={[{ width: "100%", height: "100%", backgroundColor: "#fff" }, getAnimatedStyle()]}
          />
        </View>
      </View>
      {isTop3 && (
        <View className="w-8 h-8 bg-gray-200 rounded overflow-hidden">
          <Animated.View
            style={[{ width: "100%", height: "100%", backgroundColor: "#fff" }, getAnimatedStyle()]}
          />
        </View>
      )}
    </View>
  );

  return (
    <View>
      <View className="rounded-lg overflow-hidden border border-primary/20">
        <SkeletonItem isTop3={true} />
        <SkeletonItem isTop3={true} />
        <SkeletonItem isTop3={true} />
        <SkeletonItem />
        <SkeletonItem />
      </View>
    </View>
  );
};

export default function LeaderBoard() {
  const {
    data: leaderboardData,
    isLoading,
    isError,
    error,
  } = useGetLeaderboardQuery({
    params: {
      limit: 5,
      page: 1,
      query: { type: "Class" },
      options: {
        populate: [
          {
            path: "rankings.student_id",
            model: "User",
            select: "firstName lastName",
            strictPopulate: false
          }
        ]
      }
    },
  });

  const rankings = leaderboardData?.data?.results[1]?.rankings || [];
  const topFiveLeaders = rankings.slice(0, 5).map((ranking, index) => ({
    id: index + 1,
    name: `${ranking.student_id.firstName} ${ranking.student_id.lastName}`,
    score: ranking.attendance_percentage.toFixed(2),
    image: `https://mighty.tools/mockmind-api/content/human/${Math.floor(Math.random() * 100)}.jpg`,
  }));

  if (isLoading) {
    return (
      <View className="mt-10 mb-32">
        <HeaderSkeleton />
        <LoadingSkeleton />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="mt-10 mb-32">
        <Text>Error loading leaderboard</Text>
      </View>
    );
  }

  return (
    <View className="mt-10 mb-32">
      <View className="flex flex-row items-center justify-between mb-4 ">
        <Text className="text-lg font-medium text-gray-800text-left">
          Attendance Leader Board
        </Text>
        <Link href="/leaderboard">
          <Text className="text-primary text-sm font-medium">view all</Text>
        </Link>
      </View>

      <View className="">
        {topFiveLeaders.map((leader) => (
          <View
            key={leader.id}
            className={`flex-row items-center ${
              leader.id <= 3 ? "bg-primary/10 " : ""
            } ${
              leader.id === 1
                ? "rounded-t-lg border-t border-x  border-primary/70"
                : ""
            } ${
              leader.id === 3 ? "rounded-b-lg border border-primary/70" : ""
            } ${
              leader.id === 2 ? "border-x border-t border-primary/70" : ""
            } p-3 `}
          >
            <Text className="text-lg font-bold text-gray-800 w-8">
              #{leader.id}
            </Text>
            <View className="border-2 border-primary rounded-full p-[.8px]">
              <Image
                source={{ uri: leader.image }}
                className="w-12 h-12 rounded-full"
              />
            </View>
            <View className="flex-1 ml-3">
              <Text className="text-base font-semibold text-gray-800">
                {leader.name}
              </Text>
              <Text className="text text-primary font-semibold">
                {leader.score}%
              </Text>
            </View>
            {leader.id <= 3 && (
              <Image
                source={
                  leader.id === 1
                    ? score1image
                    : leader.id === 2
                    ? score2image
                    : score3image
                }
                className="w-8 h-8"
                resizeMode="contain"
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
