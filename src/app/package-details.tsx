import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Link } from "expo-router";

import { Header } from "@/components/shared/Header";
import { packages } from "@/data/packages";

const PackageDetails = ({ pkg }: { pkg: (typeof packages)[number] }) => (
  <>
    <View className="flex flex-row items-center gap-4 justify-center mt-11 px-4">
      <View className="flex justify-center items-center border-2 rounded-2xl w-36 h-36 border-gray-200 bg-white shadow-sm">
        <Image
          source={pkg.providerLogo}
          className="w-24 h-24"
          resizeMode="contain"
          style={{ 
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          }}
        />
      </View>
      <View className="justify-center">
        <Text className="font-normal text-4xl text-center">
          {pkg.provider} Pack
        </Text>
      </View>
    </View>

    <View className="flex flex-row items-center justify-center mt-4">
      <View className="flex flex-row gap-2 mt-2 items-center">
        <Text className="font-bold text-3xl">
          {pkg.minutes
            ? `${pkg.minutes} mins`
            : pkg.data
            ? `${pkg.data}`
            : pkg.sms
            ? `${pkg.sms} SMS`
            : "Package"}
        </Text>
        <Text className="font-light text-lg">/ {pkg.duration} days</Text>
      </View>
    </View>

    <View className="flex flex-row items-center justify-center mt-4">
      <Text className="font-medium text-3xl text-primary">${pkg.price}</Text>
    </View>

    <View>
      <View className="flex flex-row items-center justify-center mt-4 mx-4">
        <View className="bg-gray-300 h-px w-1/3" />
        <View className="bg-gray-300 h-px w-1/3" />
        <View className="bg-gray-300 h-px w-1/3" />
      </View>

      <View className="flex flex-row items-center  mt-4 mx-4">
        <Text className=" text-lg">{pkg.description}</Text>
      </View>
    </View>
  </>
);

const PurchaseButton = ({ packageId }: { packageId: string }) => (
  <View className="flex flex-row items-center justify-center mt-10 mx-4">
    <Link 
      href={`/purchase?id=${packageId}`} 
      asChild
    >
      <TouchableOpacity
        className="bg-primary p-4 rounded-lg w-full"
      >
        <Text className="text-white font-semibold text-center">Buy Now</Text>
      </TouchableOpacity>
    </Link>
  </View>
);

export default function SinglePackage() {
  const { id } = useLocalSearchParams();

  const pkg = packages.find((p) => p.id === id);

  if (!pkg) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Package Not Found" showBackButton={true} />
        <View style={styles.header}>
          <Text style={styles.title}>Package Not Found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Package Details" showBackButton={true} />

      <PackageDetails pkg={pkg} />

      <PurchaseButton packageId={pkg.id} />
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
    marginBottom: 8,
  },
});