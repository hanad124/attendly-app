import DashboardBanner from "@/view/dashboard/banner";
import DashboardHeader from "@/view/dashboard/DashboardHeader";
import LeaderBoard from "@/view/dashboard/LeaderBoard";
import QuickMenu from "@/view/dashboard/quick-menu";
import {
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white pt-4 ">
      <ScrollView>
        <View className="px-6 mt-6">
          <DashboardHeader />
          <QuickMenu />
          <DashboardBanner />

          <LeaderBoard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
