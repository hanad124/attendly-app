import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/Header";
import ScheduleBanner from "@/view/Schedule/ScheduleBanner";
import Periods from "@/view/Schedule/periods";

export default function Schedule() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header title="Schedule" showBackButton={true} />
        <ScheduleBanner />
        <Periods />
      </ScrollView>
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
