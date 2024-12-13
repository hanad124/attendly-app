import { Link } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

import { useBottomSheet } from "@/stores/bottomSheet";
import Rewards from "./rewards";

export default function HomeScreen() {
  const { openSheet } = useBottomSheet();

  const handleOpenSheet = () => {
    openSheet(<Rewards />, { snapPoints: ["50%"] });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text className="text-2xl">Home Screen</Text>
      <Link href="/testPage">Go to Test Page</Link>

      <TouchableOpacity onPress={handleOpenSheet}>
        <Text>Open Bottom Sheet</Text>
      </TouchableOpacity>

    </View>
  );
}