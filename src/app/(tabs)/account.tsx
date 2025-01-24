import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/Header";
import { router } from "expo-router";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useGetSelfQuery } from "@/stores/RTK/user";
import { useAuthStore } from "@/stores/auth";
import CustomAlert from "@/components/shared/CustomAlert";

const LoadingSkeleton = () => {
  const pulseAnim = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    const pulse = Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 0.3,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulse).start();
  }, []);

  return (
    <View style={styles.content}>
      <View style={styles.profileSection}>
        <Animated.View
          style={[styles.avatarSkeleton, { opacity: pulseAnim }]}
        />
        <View style={styles.headerText}>
          <Animated.View
            style={[styles.skeletonText, { opacity: pulseAnim, width: 150 }]}
          />
          <Animated.View
            style={[
              styles.skeletonText,
              { opacity: pulseAnim, width: 200, height: 12, marginTop: 8 },
            ]}
          />
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.academicInfo}>
        {[1, 2, 3, 4].map((_, index) => (
          <Animated.View
            key={index}
            style={[styles.infoRow, { opacity: pulseAnim }]}
          >
            <View style={styles.iconSkeleton} />
            <View style={{ flex: 1, gap: 4 }}>
              <View style={[styles.skeletonText, { width: 100, height: 12 }]} />
              <View style={[styles.skeletonText, { width: 150, height: 16 }]} />
            </View>
          </Animated.View>
        ))}
      </View>

      <Animated.View style={[styles.logoutButton, { opacity: pulseAnim }]} />
    </View>
  );
};

export default function Account() {
  const { data: userData, isLoading } = useGetSelfQuery({
    params: {
      limit: 10,
      page: 1,
      populate: [
        { path: "campus_id" },
        {
          path: "semester",
          populate: [{ path: "academic_year_id" }, { path: "faculty_id" }],
        },
      ],
    },
  });
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const handleLogout = async () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = async () => {
    try {
      await useAuthStore.getState().logout();
      router.replace("/(auth)/login");
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Academic Profile" showBackButton={true} />
        <LoadingSkeleton />
      </SafeAreaView>
    );
  }

  if (!userData) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Academic Profile" showBackButton={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileSection}>
          <View
            style={styles.avatar}
            className="bg-primary/20 border border-primary"
          >
            <MaterialIcons name="account-circle" size={80} color="#1F5FD9" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.username}>
              {userData.firstName} {userData.lastName}
            </Text>
            <Text style={styles.studentId}>{userData.username}</Text>
            {/* <Text style={styles.email}>{userData.email}</Text> */}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.academicInfo}>
          <View style={styles.infoRow}>
            <View style={[styles.iconWrapper, { backgroundColor: "#e0f2fe" }]}>
              <FontAwesome5 name="graduation-cap" size={20} color="#0284c7" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Program</Text>
              <Text style={styles.infoValue}>{userData.program}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={[styles.iconWrapper, { backgroundColor: "#f3e8ff" }]}>
              <Ionicons name="school" size={20} color="#9333ea" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Year of Study</Text>
              <Text style={styles.infoValue}>{userData.yearOfstudy} Year</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={[styles.iconWrapper, { backgroundColor: "#fef9c3" }]}>
              <MaterialIcons name="location-on" size={20} color="#ca8a04" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Campus</Text>
              <Text style={styles.infoValue}>
                {userData.campus_id.campus_name}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={[styles.iconWrapper, { backgroundColor: "#dcfce7" }]}>
              <MaterialIcons name="school" size={20} color="#16a34a" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Faculty</Text>
              <Text style={styles.infoValue}>{userData.faculty_id.name}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
          className="mb-24"
        >
          <MaterialIcons name="logout" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <CustomAlert
          visible={showLogoutAlert}
          title="Logout"
          message="Are you sure you want to logout of your account?"
          type="warning"
          primaryButton={{
            text: "Logout",
            onPress: confirmLogout,
          }}
          secondaryButton={{
            text: "Cancel",
            onPress: () => setShowLogoutAlert(false),
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 24,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 0,
  },
  avatar: {
    // backgroundColor: "#1F5FD9",
    borderRadius: 50,
    padding: 5,
    marginBottom: 16,
  },
  headerText: {
    alignItems: "center",
  },
  username: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  studentId: {
    fontSize: 16,
    color: "#4f46e5",
    fontWeight: "500",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#6b7280",
  },
  divider: {
    height: 1,
    backgroundColor: "#f3f4f6",
    marginVertical: 24,
  },
  academicInfo: {
    gap: 20,
    marginBottom: 32,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: "#1f2937",
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
    backgroundColor: "#fef2f2",
    borderRadius: 12,
  },
  logoutText: {
    color: "#ef4444",
    fontSize: 16,
    fontWeight: "600",
  },
  // Skeleton styles
  avatarSkeleton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#e5e7eb",
    marginBottom: 16,
  },
  skeletonText: {
    height: 16,
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
  },
  iconSkeleton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#e5e7eb",
  },
});
