import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import { Svg, Defs, Rect, Pattern, Circle, G } from "react-native-svg";
import { ChevronDown, ChevronLeft } from "lucide-react-native";
import TopThreeLeaderboard from "./TopThreeLeaderboard";
import { LeaderboardEntry } from "../types";
import { Header } from "@/components/shared/Header";

import confettiLeft from "@/assets/images/leader-board/confetti-left.png";
import confettiRight from "@/assets/images/leader-board/confetti-right.png";
import { getInitials } from "..";

const PRIMARY_COLOR = "#1F5FD9";

const { width } = Dimensions.get("window");

interface LeaderboardHeaderProps {
  topThree: LeaderboardEntry[];
}

interface ControlOption {
  label: string;
  value: string;
}

interface ControlProps {
  label: string;
  value: string;
  options?: ControlOption[];
}

const Control: React.FC<ControlProps> = ({ label, value }) => (
  <View style={styles.controlContainer}>
    <Text style={styles.controlLabel}>{label}</Text>
    <View style={styles.controlValue}>
      <Text style={styles.controlValueText}>{value}</Text>
      <ChevronDown size={16} color="#ffffff" />
    </View>
  </View>
);

const BackgroundPattern = () => (
  <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
    <Defs>
      <Pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
        <Circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.2)" />
      </Pattern>
      <Pattern
        id="largeDots"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <Circle cx="4" cy="4" r="2" fill="rgba(255,255,255,0.15)" />
      </Pattern>
    </Defs>
    {/* Top edge dots */}
    <G opacity="0.5">
      <Rect x="0" y="0" width="100%" height="60" fill="url(#dots)" />
    </G>
    {/* Bottom edge dots */}
    <G opacity="0.5">
      <Rect x="0" y="280" width="100%" height="60" fill="url(#dots)" />
    </G>
    {/* Left edge dots */}
    <G opacity="0.5">
      <Rect x="0" y="0" width="60" height="100%" fill="url(#largeDots)" />
    </G>
    {/* Right edge dots */}
    <G opacity="0.5">
      <Rect
        x="100%"
        y="0"
        width="60"
        height="100%"
        fill="url(#largeDots)"
        transform="translate(-60, 0)"
      />
    </G>
  </Svg>
);

const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = ({ topThree }) => {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("My Class");

  const dropdownOptions = {
    filter: ["My Class", "Semester", "Department"],
  };

  const handleSelect = (option: string) => {
    setSelectedFilter(option);
    setActiveDropdown(null);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[PRIMARY_COLOR, `${PRIMARY_COLOR}`, `${PRIMARY_COLOR}`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View className="flex flex-row items-center justify-between  mt-2 mx-2 " style={{ zIndex: 2 }}>
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex flex-row items-center gap-2ml-5"
          >
            <ChevronLeft size={24} color="#ffffff" />
            <Text className="text-white text-lg">Leaderboard</Text>
          </TouchableOpacity>

          {/* modern filtering section */}
          <TouchableOpacity
            className="flex flex-row items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full mr-5"
            onPress={() =>
              setActiveDropdown(activeDropdown === "filter" ? null : "filter")
            }
          >
            <Text className="text-white text-sm">{selectedFilter}</Text>
            <ChevronDown size={16} color="#ffffff" />
          </TouchableOpacity>
        </View>
        {/* <BackgroundPattern /> */}
        {/* Confetti Images */}
        <View style={[styles.confettiContainer, { zIndex: 0 }]}>
          <Image
            style={[
              styles.confettiLeft,
              { width: width * 0.4, height: width * 0.4 },
            ]}
            source={confettiLeft}
          />
          <Image
            style={[
              styles.confettiRight,
              { width: width * 0.4, height: width * 0.4 },
            ]}
            source={confettiRight}
          />
        </View>
        {/* Dropdown Modal */}
        {activeDropdown && (
          <Pressable
            style={[styles.modalOverlay, { zIndex: 3 }]}
            onPress={() => setActiveDropdown(null)}
          >
            <View
              style={[
                styles.dropdownContainer,
                {
                  position: "absolute",
                  top: 80,
                  right: 20,
                  zIndex: 4,
                },
              ]}
            >
              {dropdownOptions[activeDropdown].map((option, index) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.dropdownItem,
                    index !== dropdownOptions[activeDropdown].length - 1 &&
                      styles.dropdownItemBorder,
                    selectedFilter === option && styles.selectedItem,
                  ]}
                  onPress={() => handleSelect(option)}
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      selectedFilter === option && styles.selectedText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        )}
        <View style={styles.content}>
          <View className="flex flex-row items-center justify-center mb-5 mt-10">
            <Text className="text-white text-xl">
              👑 {selectedFilter} Leaderboard 👑
            </Text>
          </View>
          <TopThreeLeaderboard
            users={topThree.map((user) => ({
              ...user,
              render: () => (
                <View className="flex flex-col items-center">
                  <View className="w-20 h-20 rounded-full bg-primary/20 border-[0.4px] border-primary/70 items-center justify-center mb-2">
                    <Text className="text-primary text-lg">{getInitials(user.name)}</Text>
                  </View>
                  <Text className="text-base font-semibold text-gray-800 mb-1">{user.name}</Text>
                  {user.isCurrentUser && (
                    <View className="flex flex-row items-center justify-center bg-primary px-4 py-[0.5px] rounded-full border border-primary">
                      <Text className="text-sm text-white font-medium">YOU</Text>
                    </View>
                  )}
                  <Text className="text-sm text-gray-600">{user.percentage}%</Text>
                </View>
              ),
            }))}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    overflow: "hidden",

  },
  gradient: {
    paddingTop: 0,
    paddingHorizontal: 0,
    paddingBottom: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  content: {
    zIndex: 1,
    paddingHorizontal: 20,    
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
  },
  chevron: {
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
  controlContainer: {
    alignItems: "flex-start",
  },
  controlLabel: {
    fontSize: 12,
    color: "#9ca3af",
    marginBottom: 4,
  },
  controlValue: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  controlValueText: {
    color: "#ffffff",
    marginRight: 8,
    fontSize: 14,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1000,
  },
  dropdownContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    width: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1001,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  dropdownText: {
    fontSize: 15,
    color: "#374151",
  },
  selectedItem: {
    backgroundColor: "#f3f4f6",
  },
  selectedText: {
    color: "#1F5FD9",
    fontWeight: "500",
  },
  confettiContainer: {
    position: "absolute",
    width: width,
    height: "100%",
    zIndex: -1,
  },
  confettiLeft: {
    position: "absolute",
    left: -20,
    top: 40,
    opacity: 0.8,
  },
  confettiRight: {
    position: "absolute",
    right: -20,
    top: 40,
    opacity: 0.8,
  },
});

export default LeaderboardHeader;
