import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  SafeAreaView as SafeAreaContext,
  Edge,
} from "react-native-safe-area-context";
import LeaderboardHeader from "./components/LeaderboardHeader";
import { LeaderboardEntry } from "./types";
import { useGetLeaderboardQuery } from "@/stores/RTK/leaderboard";
import Animated, { FadeIn, Layout } from "react-native-reanimated";
import { useAuthStore } from "@/stores/auth";

const PRIMARY_COLOR = "#1F5FD9";

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Loading skeleton for list items
const LeaderboardItemSkeleton = () => (
  <Animated.View
    entering={FadeIn}
    style={[styles.itemContainer]}
    className="p-4 flex flex-row items-center justify-between"
  >
    <View style={styles.rankContainer}>
      <View className="w-5 h-4 bg-gray-200 rounded animate-pulse" />
    </View>
    <View
      style={[styles.avatarContainer]}
      className="bg-gray-200 animate-pulse"
    />
    <View style={styles.userInfo}>
      <View className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-2" />
      <View className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
    </View>
    <View style={styles.expContainer}>
      <View className="w-16 h-6 bg-gray-200 rounded animate-pulse" />
    </View>
  </Animated.View>
);

const LeaderboardItem = ({
  item,
  isLast,
}: {
  item: LeaderboardEntry;
  isLast?: boolean;
}) => {
  const initials = getInitials(item.name);

  return (
    <Animated.View
      entering={FadeIn}
      layout={Layout}
      style={[styles.itemContainer]}
      className={`${
        !isLast ? "" : ""
      } p-4 flex flex-row items-center justify-between ${
        item.isCurrentUser && "bg-primary/20"
      }`}
    >
      <View style={styles.rankContainer}>
        <Text
          style={[styles.rank]}
          className={`${item.isCurrentUser ? "text-primary" : "text-white"}`}
        >
          {item.rank}.
        </Text>
      </View>

      <View
        style={[
          styles.avatarContainer,
          item.isCurrentUser && styles.currentUserAvatar,
        ]}
      >
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
        ) : (
          <Text style={[styles.avatarText]}>{initials}</Text>
        )}
      </View>

      <View style={styles.userInfo}>
        <View className="flex flex-row items-center gap-2">
          <Text
            style={[styles.name]}
            numberOfLines={1}
            className={`${item.isCurrentUser ? "text-primary" : "text-white"}`}
          >
            {item.name}
          </Text>
          {item.isCurrentUser && (
            <View className="flex flex-row items-center gap-1">
              <View className="flex flex-row items-center justify-center bg-primary px-4 py-[0.5px] rounded-full border border-primary">
                <Text className="text-sm text-white font-medium">YOU</Text>
              </View>
            </View>
          )}
        </View>
        <Text
          style={styles.username}
          numberOfLines={1}
          className={`${
            item.isCurrentUser ? "text-primary" : "text-slate-500"
          }`}
        >
          @{item.username}
        </Text>
      </View>

      <View style={styles.expContainer}>
        <View className="flex flex-row items-center bg-transparent border border-slate-700 rounded-full px-2 py-[0.5px]">
          {/* <View className="p-1 py-[.8px] bg-green-500 rounded-sm">
            <Text className="text-white text-sm">XP</Text>
          </View> */}
          <Text className="text-slate-700 font-bold ">{item.percentage}%</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const Leaderboard = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const user = useAuthStore((state) => state.user);

  const loggedUserId = user.id;

  const {
    data: leaderboardData,
    isLoading,
    isFetching,
  } = useGetLeaderboardQuery({
    currentPage,
  });

  const handleViewMore = () => {
    if (!isFetching) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const rankings = leaderboardData?.data?.results[1]?.rankings || [];
  const hasMore = rankings.length >= 10;

  // Get top 3 for the header
  const topThree = rankings.slice(0, 3).map((ranking) => {
    const isCurrentUser = ranking.student_id.id === loggedUserId;
    // console.log("Top 3 - Student ID:", ranking.student_id.id, "isCurrentUser:", isCurrentUser);
    return {
      id: ranking._id,
      rank: ranking.rank,
      name: ranking?.student_id.firstName + " " + ranking?.student_id.lastName,
      username: `${ranking?.student_id.username}`,
      percentage: ranking.attendance_percentage,
      exp: ranking.points,
      avatar: undefined,
      isCurrentUser,
    };
  });

  // Get users from rank 4 onwards
  const otherUsers = rankings.slice(3).map((ranking) => {
    const isCurrentUser = ranking?.student_id?.id === loggedUserId;

    return {
      id: ranking._id,
      rank: ranking.rank,
      name: ranking?.student_id?.firstName + " " + ranking?.student_id.lastName,
      username: `${ranking?.student_id?.username}`,
      exp: ranking.points,
      avatar: undefined,
      percentage: ranking.attendance_percentage,
      isCurrentUser,
    };
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LeaderboardHeader topThree={[]} />
        <View style={styles.listContainer}>
          {[1, 2, 3, 4].map((_, index) => (
            <LeaderboardItemSkeleton key={index} />
          ))}
        </View>
      </View>
    );
  }

  const renderItem = ({ item }: { item: LeaderboardEntry }) => (
    <LeaderboardItem
      key={item.id}
      item={item}
      isLast={item.rank === rankings.length}
    />
  );

  const ListFooter = () =>
    hasMore ? (
      <TouchableOpacity
        onPress={handleViewMore}
        disabled={isFetching}
        className="flex flex-row items-center justify-center mt-7 mb-5"
      >
        <Animated.View
          entering={FadeIn}
          className={`flex flex-row gap-2 items-center bg-white px-10 py-4 rounded-lg border border-gray-200 ${
            isFetching ? "opacity-50" : ""
          }`}
        >
          {isFetching ? (
            <View className="flex flex-row items-center gap-2">
              <ActivityIndicator size="small" color={PRIMARY_COLOR} />
              <Text className="text-gray-700">Loading...</Text>
            </View>
          ) : (
            <Text className="text-gray-700">View More</Text>
          )}
        </Animated.View>
      </TouchableOpacity>
    ) : null;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaContext
        edges={["top"]}
        style={{ backgroundColor: PRIMARY_COLOR }}
      />
      <View style={styles.container} className="bg-white">
        <FlatList
          ListHeaderComponent={() => <LeaderboardHeader topThree={topThree} />}
          data={otherUsers}
          renderItem={renderItem}
          ListFooterComponent={ListFooter}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
      <SafeAreaContext
        edges={["bottom"]}
        style={{ backgroundColor: "white" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  listContainer: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingHorizontal: 16,
  },
  listContent: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currentUserContainer: {
    backgroundColor: PRIMARY_COLOR,
  },
  rankContainer: {
    width: 30,
    alignItems: "center",
  },
  rank: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666666",
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  currentUserAvatar: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  avatarImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: "600",
    color: PRIMARY_COLOR,
  },
  userInfo: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  username: {
    fontSize: 13,
  },
  expContainer: {
    alignItems: "flex-end",
  },
  currentUserText: {
    color: "#FFFFFF",
  },
});

export default Leaderboard;
