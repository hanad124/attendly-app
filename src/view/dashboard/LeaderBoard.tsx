import { View, Text, Image, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";

import score1image from "@/assets/images/leader-board/score-1.png";
import score2image from "@/assets/images/leader-board/score-2.png";
import score3image from "@/assets/images/leader-board/score-3.png";
import { useGetLeaderboardQuery } from "@/stores/RTK/leaderboard";
import { Link } from "expo-router";
import { useAuthStore } from "@/stores/auth";

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
      <View className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
        <Animated.View
          style={[{ width: "100%", height: "100%", backgroundColor: "#fff" }, getAnimatedStyle()]}
        />
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
      <View className="rounded-lg overflow-hidden ">
        <SkeletonItem isTop3={true} />
        <SkeletonItem isTop3={true} />
        <SkeletonItem isTop3={true} />
        <SkeletonItem />
        <SkeletonItem />
      </View>
    </View>
  );
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
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

  const user = useAuthStore((state) => state.user);
  const loggedUserId = user?.id;

  const rankings = leaderboardData?.data?.results[0]?.rankings || [];

  // Find logged user's ranking
  const userRanking = rankings.find(ranking => ranking?.student_id?.id === loggedUserId);

  // Get top 5 rankings
  const topFiveLeaders = rankings?.slice(0, 5).map((ranking, index) => ({
    id: ranking?.rank,
    name: `${ranking.student_id?.firstName} ${ranking?.student_id?.lastName}`,
    score: ranking?.attendance_percentage?.toFixed(2),
    initials: getInitials(`${ranking.student_id.firstName} ${ranking?.student_id.lastName}`),
    isCurrentUser: ranking?.student_id?.id === loggedUserId
  }));

  // Check if user is not in top 5 and add them to the bottom
  const isUserInTopFive = topFiveLeaders.some(leader => leader?.isCurrentUser);
  const displayLeaders = [...topFiveLeaders];

  if (userRanking && !isUserInTopFive) {
    displayLeaders.push({
      id: userRanking?.rank,
      name: `${userRanking?.student_id.firstName} ${userRanking.student_id.lastName}`,
      score: userRanking?.attendance_percentage?.toFixed(2),
      initials: getInitials(`${userRanking?.student_id?.firstName} ${userRanking.student_id?.lastName}`),
      isCurrentUser: true
    });
  }

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
        {displayLeaders.map((leader, index) => (
          <View
            key={leader?.id}
            className={`flex-row items-center ${
              leader.id <= 3 ? "bg-primary/10 " : ""
            } ${
              index === 0
                ? "rounded-t-lg border-primary/70"
                : ""
            } ${
              index === 2 && displayLeaders?.length <= 3 ? "rounded-b-lg border-primary/70" : ""
            } ${
              index === 4 && !isUserInTopFive ? "mt-2" : ""
            } ${
              leader?.id === 2 ? "border-primary/70" : ""
            } ${
              leader?.isCurrentUser && leader.id > 3 ? "bg-primary/5 rounded-lg" : ""
            } py-2 px-3`}
          >
            <Text className="text-lg font-bold text-gray-800 w-8">
              #{leader?.id}
            </Text>
            <View className="w-9 h-9 rounded-full bg-primary/20 border-[0.4px] border-primary/70 items-center justify-center">
              <Text className="text-primary text-sm">
                {leader?.initials}
              </Text>
            </View>
            <View className="flex-1 ml-4">
              <View className="flex flex-row items-center gap-2">
                <Text className="text-base font-semibold text-gray-800">
                  {leader?.name}
                </Text>
                {leader?.isCurrentUser && (
                  <View className="flex flex-row items-center justify-center bg-primary px-3 py-[0.5px] rounded-full border border-primary">
                    <Text className="text-sm text-white font-medium">YOU</Text>
                  </View>
                )}
              </View>
              <Text className="text text-primary font-semibold">
                {leader?.score}%
              </Text>
            </View>
            {leader?.id <= 3 && (
              <Image
                source={
                  leader?.id === 1
                    ? score1image
                    : leader?.id === 2
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
