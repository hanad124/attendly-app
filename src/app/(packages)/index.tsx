import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { Header } from "@/components/shared/Header";
import FilteringTabs from "@/components/tabs/packages/FilteringTabs";

export default function BuyPackages() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Packages" showBackButton={true} />
      <ScrollView>
        <FilteringTabs />
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
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "medium",
  },
});
