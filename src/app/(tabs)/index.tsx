import DashboardBanner from "@/view/dashboard/banner";
import DashboardHeader from "@/view/dashboard/DashboardHeader";
import PopularProviders from "@/view/dashboard/popular-providers";
import QuickMune from "@/view/dashboard/quick-mune";
import Recomendation from "@/view/dashboard/recomendation";
import { Link } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white pt-4 ">
      <ScrollView>
        <View className="px-6 mt-6">
          <DashboardHeader />
          <QuickMune />
          <DashboardBanner />
          <Recomendation />
          <PopularProviders />
        <Text className="mt-16">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem tempore .</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
