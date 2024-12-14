import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { X, Package as PackageIcon, Frown } from "lucide-react-native";
import { packages, Package } from "../../../data/packages";
import { Link } from "expo-router";

interface FilterTab {
  id: string;
  label: string;
}

interface FilteringTabsProps {
  tabs?: FilterTab[];
  activeColor?: string;
  inactiveColor?: string;
  onTabChange?: (activeTab: string) => void;
  showClearFilter?: boolean;
}

const tabTypes = [
  { id: "for you", label: "For you" },
  { id: "voice", label: "Voice" },
  { id: "internet", label: "Internet" },
  { id: "sms", label: "SMS" },
  { id: "data", label: "Data" },
  { id: "combo", label: "Combo" },
];

export const PACKAGE_FILTER_TABS: FilterTab[] = tabTypes;

const IconWrapper = ({ icon: Icon, color = "black", size = 24 }) => {
  return (
    <View style={{ width: size, height: size }}>
      <Icon color={color} size={size} strokeWidth={2} />
    </View>
  );
};

export default function FilteringTabs({
  tabs = PACKAGE_FILTER_TABS,
  activeColor = "#1F5FD9",
  inactiveColor = "black",
  onTabChange,
  showClearFilter = true,
}: FilteringTabsProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>(packages);

  const normalizedTabs = useMemo(() => {
    const processedTabs =
      tabs.length > 0 ? tabs : [{ id: "default", label: "For you" }];
    console.log("Normalized Tabs:", processedTabs);
    return processedTabs;
  }, [tabs]);

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);

    if (tabId === "for you") {
      setFilteredPackages(packages);
    } else {
      const filtered = packages.filter((pkg) => pkg.type === tabId);
      setFilteredPackages(filtered);
    }
    onTabChange?.(tabId);
  };

  const handleClearFilter = () => {
    const defaultTab = normalizedTabs[0].id;
    setActiveTab(defaultTab);
    setFilteredPackages(packages);
    onTabChange?.(defaultTab);
  };

  if (normalizedTabs.length === 0) {
    return null;
  }

  return (
    <View style={styles.container} className="my-6 px-4 flex flex-col">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {normalizedTabs.map((tab, index) => (
          <View
            key={tab.id}
            style={index < normalizedTabs.length - 1 ? styles.tabWrapper : null}
          >
            <TouchableOpacity
              onPress={() => handleTabPress(tab.id)}
              style={[
                styles.tabButton,
                {
                  backgroundColor: activeTab === tab.id ? activeColor : "#fff",
                },
              ]}
              className="py-2 px-6 text-black border border-gray-200 rounded-full"
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: activeTab === tab.id ? "white" : inactiveColor,
                  },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {showClearFilter && activeTab !== normalizedTabs[0].id && (
        <TouchableOpacity
          onPress={handleClearFilter}
          style={styles.clearFilterButton}
        >
          <X size={16} color="#8E8E93" />
        </TouchableOpacity>
      )}

      {filteredPackages.length > 0 ? (
        <List packages={filteredPackages} />
      ) : (
        <View className="flex items-center justify-center p-8">
          <Frown size={64} color="#A0AEC0" />
          <Text className="text-xl text-gray-500 mt-4 text-center">
            No packages available for this category
          </Text>
          <Text className="text-sm text-gray-400 mt-2 text-center">
            We're working on adding more options soon!
          </Text>
        </View>
      )}
    </View>
  );
}

function List({ packages }: { packages: Package[] }) {
  return (
    <View className="mx-2 mt-5">
      {packages.map((pkg) => (
        <Link
          href={`/package-details?id=${pkg.id}`}
          key={pkg.id}
          className="mt-2"
        >
          <View
            className="flex flex-row justify-between rounded-lg p-4 mt-2 w-full border border-gray-200 "
            style={{
              backgroundColor: "white",
            }}
          >
            <View className="flex flex-row gap-6">
              <View className="flex justify-center items-center border rounded-full p-4 border-gray-300">
                <IconWrapper icon={pkg.icon} color="#1F5FD9" size={24} />
              </View>
              <View>
                <Text>{pkg.name}</Text>
                <View className="flex flex-row gap-2 mt-2 items-center">
                  <Text className="font-bold text-xl">
                    {pkg.minutes
                      ? `${pkg.minutes} mins`
                      : pkg.data
                      ? `${pkg.data}`
                      : pkg.sms
                      ? `${pkg.sms} SMS`
                      : "Package"}
                  </Text>
                  <Text className="font-light">/ {pkg.duration} days</Text>
                </View>
              </View>
            </View>
            <View>
              <Text className="font-semibold text-[#1F5FD9] text-xl">
                ${pkg.price.toFixed(2)}
              </Text>
            </View>
          </View>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "column",
    // alignItems: 'center'
  },
  scrollViewContent: {
    paddingHorizontal: 8,
    alignItems: "center",
  },
  tabWrapper: {
    marginRight: 12,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  clearFilterButton: {
    position: "absolute",
    right: 16,
    backgroundColor: "#F2F2F7",
    padding: 8,
    borderRadius: 24,
  },
});
