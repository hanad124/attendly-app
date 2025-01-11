import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import LeaderboardHeader from "./components/LeaderboardHeader";
import { LeaderboardEntry } from "./types";
import { ChevronRight } from "lucide-react-native";

const PRIMARY_COLOR = "#1F5FD9";
const { width } = Dimensions.get("window");

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const LeaderboardItem = ({
  item,
  isLast,
}: {
  item: LeaderboardEntry;
  isLast?: boolean;
}) => {
  const initials = getInitials(item.name);

  return (
    <View
      style={[
        styles.itemContainer,
        
        // item.isCurrentUser && styles.currentUserContainer,
      ]}
      className={`${
        !isLast ? "border-b border-gray-200" : ""
      } p-4 flex flex-row items-center justify-between ${
        item.isCurrentUser && "bg-primary/20 border border-primary rounded-b-lg"}`}
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
          <Text
            style={[
              styles.avatarText,
            ,
            ]}
          >
            {initials}
          </Text>
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
          {
            item.isCurrentUser && (
              <View className="flex flex-row items-center gap-1">
                <View className="flex flex-row items-center justify-center bg-primary px-4 py-[0.5px] rounded-full border border-primary">

                <Text className="text-sm text-white font-medium">YOU</Text>
                </View>
              </View>
            )
          }
        </View>
        <Text
          style={styles.username}
          numberOfLines={1}
          className={`${item.isCurrentUser ? "text-primary" : "text-white"}`}
          >
          @{item.username}
        </Text>
      </View>

      <View style={styles.expContainer}>
        <Text
          style={[styles.exp]}
        >
          {item.exp.toLocaleString()}
        </Text>
        <Text
          style={styles.expLabel}
          className={`${item.isCurrentUser ? "text-primary" : "text-white"}`}
          >
          EXP
        </Text>
      </View>
    </View>
  );
};

const Leaderboard = () => {
  const topThree: LeaderboardEntry[] = [
    {
      id: "1",
      rank: 1,
      name: "John Doe",
      username: "johndoe",
      exp: 1200,
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: "2",
      rank: 2,
      name: "Jane Smith",
      username: "janesmith",
      exp: 1100,
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: "3",
      rank: 3,
      name: "Mike Johnson",
      username: "mikej",
      exp: 1000,
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ];

  const otherUsers: LeaderboardEntry[] = [
    {
      id: "4",
      rank: 4,
      name: "Jake Son",
      username: "jakeson",
      exp: 777,
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: "5",
      rank: 5,
      name: "Thomas Smith",
      username: "thomas",
      exp: 666,
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: "6",
      rank: 6,
      name: "Chloe Brown",
      username: "chloeb",
      exp: 501,
      avatar: "https://i.pravatar.cc/150?img=6",
    },
    {
      id: "7",
      rank: 7,
      name: "Sophia Turner",
      username: "sophiaturner",
      exp: 482,
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    {
      id: "8",
      rank: 8,
      name: "Ethan Clark",
      username: "ethanclark",
      exp: 320,
      isCurrentUser: true,
      avatar: "https://i.pravatar.cc/150?img=8",
    },
  ];

  return (
    <View style={styles.container}>
      <LeaderboardHeader topThree={topThree} />
      <View style={styles.listContainer}>
        <FlatList
          data={otherUsers}
          renderItem={({ item, index }) => (
            <LeaderboardItem
              item={item}
              isLast={index === otherUsers.length - 1}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>

      {/* modern view more button */}
      <View className="flex flex-row items-center justify-center mt-7 ">
        <View className="flex flex-row gap-2 mt-2 items-center bg-white px-10 py-4 rounded-lg border border-gray-200">
          <Text className="">
            View More
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
  },
  listContainer: {
    // flex: 1,
    backgroundColor: "#fff",
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    marginTop: -20,
  },
  listContent: {
    paddingHorizontal: 16,
    marginTop: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: '#FFFFFF',
    // marginBottom: 8,
    padding: 12,
    // borderRadius: 12,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 2,
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
    // color: '#666666',
  },
  expContainer: {
    alignItems: "flex-end",
  },
  exp: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  expLabel: {
    fontSize: 11,
    // color: '#666666',
  },
  currentUserText: {
    color: "#FFFFFF",
  },
});

export default Leaderboard;
