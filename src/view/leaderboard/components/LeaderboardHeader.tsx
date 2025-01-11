import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import { Svg, Defs, Rect, Pattern, Circle, G } from "react-native-svg";
import { ChevronDown, ChevronLeft } from "lucide-react-native";
import TopThreeLeaderboard from "./TopThreeLeaderboard";
import { LeaderboardEntry } from "../types";
import { Header } from "@/components/shared/Header";

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
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[PRIMARY_COLOR, `${PRIMARY_COLOR}EE`, `${PRIMARY_COLOR}DD`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <BackgroundPattern />
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex flex-row items-center gap-2 mt-5 ml-5"
        >
          <ChevronLeft size={24} color="#ffffff" />
          <Text className="text-white text-lg">Leaderboard</Text>
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.topBar}>
            {/* <View style={styles.leftSection}>
              <Text style={styles.title}>Top 50</Text>
              <ChevronDown size={20} color="#ffffff" style={styles.chevron} />
            </View> */}
            {/* <View style={styles.rightSection}>
              <Settings2 size={20} color="#ffffff" style={styles.icon} />
              <MoreHorizontal size={20} color="#ffffff" />
            </View> */}
          </View>
          <TopThreeLeaderboard users={topThree} />
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
    paddingTop: 10,
    paddingHorizontal: 0,
    paddingBottom: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  content: {
    zIndex: 1,
    padding: 20,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
});

export default LeaderboardHeader;
