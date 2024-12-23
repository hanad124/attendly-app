import { Tabs } from "expo-router";
import { Home, User, ScanLine, BookOpenText, Trophy, ListCheck, ListTodo } from "lucide-react-native";
import { useBottomSheet } from "@/stores/bottomSheet";
import { useLoadingModal } from "@/stores/loadingModal";

export default function TabsLayout() {
  const { isOpen } = useBottomSheet();
  const { isOpen: isLoading } = useLoadingModal();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
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
            paddingHorizontal: 0,
            paddingTop: 4,
          },
          tabBarActiveTintColor: "#1F5FD9",
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
          name="courses"
          options={{
            tabBarLabel: "Courses", 
            tabBarIcon: ({ color }) => (
              <BookOpenText size={20} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="scan"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ color }) => (
              <ScanLine size={32} color="#FFFFFF" strokeWidth={2.5} />
            ),
            tabBarItemStyle: {
              backgroundColor: '#1F5FD9',
              width: 70,
              height: 70,
              borderRadius: 22,
              marginTop: -32,
              position: 'relative',
              borderWidth: 3,
              borderColor: '#4B82E5',
              shadowColor: "#1F5FD9",
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.35,
              shadowRadius: 6,
              elevation: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
            },
            tabBarIconStyle: {
              height: '100%',
              width: '100%',
              margin: 0,
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }
          }}
        />
        <Tabs.Screen
          name="attendance"
          options={{
            tabBarLabel: "Attendance",
            tabBarIcon: ({ color }) => (
              <ListTodo size={24} color={color} strokeWidth={2} />
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
