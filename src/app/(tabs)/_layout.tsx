import { Tabs } from "expo-router";
import { Home, LayoutGrid, Star, User, Menu } from "lucide-react-native";
import BottomSheet from "@/components/BottomSheet";
import { useBottomSheet } from "@/stores/bottomSheet";
import { useLoadingModal } from "@/stores/loadingModal";

export default function TabsLayout() {
  const { isOpen } = useBottomSheet();
  const { isOpen: isLoading } = useLoadingModal();

  return (
    <>
      <Tabs
        screenOptions={{
          // headerLeft: () => (
          //     <TouchableOpacity
          //       onPress={() => navigation.openDrawer()}
          //       style={{ marginLeft: 16 }}
          //     >
          //       <Menu size={20} color="black" />
          //     </TouchableOpacity>
          //   ),
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            // bottom: 14,
            // marginHorizontal: 16,
            // borderRadius: 24,
            height: 90,
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.1)",
            elevation: 0,
            zIndex: 2,
            display: isLoading || isOpen ? "none" : "flex",
          },
          tabBarItemStyle: {
            padding: 4,
            paddingTop: 4,
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#8E8E93",
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
            marginTop: 2,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Home size={20} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="(packages)"
          options={{
            tabBarLabel: "Packages",
            tabBarIcon: ({ color }) => (
              <LayoutGrid size={20} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="rewards"
          options={{
            tabBarLabel: "Rewards",
            tabBarIcon: ({ color }) => (
              <Star size={20} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            tabBarLabel: "Account",
            tabBarIcon: ({ color }) => (
              <User size={20} color={color} strokeWidth={2} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
