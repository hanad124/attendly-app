import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { Header } from "@/components/shared/Header";
import AttendanceStates from "@/view/attendance";

export default function Attendance() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Attendance Stats" showBackButton={true} />
      <AttendanceStates />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
  },
});
