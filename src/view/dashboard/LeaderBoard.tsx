import { View, Text, Image } from "react-native";
import React from "react";

const leaderboardData2 = [
  {
    id: 1,
    name: "Hanad Mohamed",
    score: 98,
    image: "https://mighty.tools/mockmind-api/content/human/104.jpg",
  },
  {
    id: 2,
    name: "Abdikafi Isse",
    score: 85,
    image: "https://mighty.tools/mockmind-api/content/human/65.jpg",
  },
  {
    id: 3,
    name: "Mustafa Abubakar",
    score: 79,
    image: "https://mighty.tools/mockmind-api/content/human/5.jpg",
  },
  {
    id: 4,
    name: "Emma Wilson",
    score: 72,
    image: "https://mighty.tools/mockmind-api/content/human/7.jpg",
  },
  {
    id: 5,
    name: "Alex Brown",
    score: 65,
    image: "https://mighty.tools/mockmind-api/content/human/75.jpg",
  },
];

import score1image from "@/assets/images/leader-board/score-1.png";
import score2image from "@/assets/images/leader-board/score-2.png";
import score3image from "@/assets/images/leader-board/score-3.png";
import { useGetLeaderboardQuery } from "@/stores/RTK/leaderboard";
import { Link } from "expo-router";

export default function LeaderBoard() {
  const {
    data: leaderboardData,
    isLoading,
    isError,
    error,
  } = useGetLeaderboardQuery({
    params: {
      limit: 10,
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

  console.log(
    "🚀 ~ file: LeaderBoard.tsx:47 ~ leaderboardData:",
    leaderboardData?.data
  );

  return (
    <View className="mt-10 mb-32">
      <View className="flex flex-row items-center justify-between mb-4 ">
        <Text className="text-lg font-medium text-gray-800text-left">
          Attendence Leader Board
        </Text>
        <Link href="/leaderboard">
        <Text className="text-primary text-sm font-medium">view all</Text>
        </Link>
      </View>

      <View className="">
        {leaderboardData2.map((leader) => (
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
                // style={{backgroundColor: "#1F5FD9"}}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
