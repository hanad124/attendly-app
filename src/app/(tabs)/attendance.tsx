import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Header } from "@/components/shared/Header";

export default function Attendance() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Attendance" showBackButton={true} />
      <View style={styles.header}>
        <Text style={styles.title}>Attendance</Text>

        <Link href="/testPage">Go to Test Page</Link>
      </View>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
