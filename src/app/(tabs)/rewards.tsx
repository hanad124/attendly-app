import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Header } from "@/components/shared/Header";

export default function Rewards() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Rewards" showBackButton={true} />
      <View style={styles.header}>
        <Text style={styles.title}>Rewards</Text>

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
