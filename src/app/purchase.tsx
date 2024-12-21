import React, { useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {ChevronRight} from "lucide-react-native";

import { Header } from "@/components/shared/Header";
import { useBottomSheet } from "@/stores/bottomSheet";
import { packages } from "@/data/packages";
import { LoadingModal } from "@/components/shared/modals/Loading";
import { useLoadingModal } from "@/stores/loadingModal";

// Validation Schema
const purchaseSchema = yup.object().shape({
  paymentMethod: yup.string().required("Payment method is required"),
  senderNumber: yup.string()
    .matches(/^[0-9]{9}$/, "Sender number must be 9 digits")
    .required("Sender number is required"),
  receiverNumber: yup.string()
    .matches(/^[0-9]{9}$/, "Receiver number must be 9 digits")
    .required("Receiver number is required"),
});

export default function PurchasePage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { openSheet, closeSheet,   } = useBottomSheet();

  const { openLoading } = useLoadingModal();

  const router = useRouter();

  const pkg = packages.find((p) => p.id === id);

  const { 
    control, 
    handleSubmit, 
    setValue, 
    watch,
    reset,
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(purchaseSchema),
    defaultValues: {
      paymentMethod: "EVC Plus", 
      senderNumber: "",
      receiverNumber: "",
    }
  });

  const handleOpenPaymentMethods = () => {
    const paymentMethods = [
      { name: "EVC Plus" },
      { name: "E-Dahab" },
    ];

    openSheet(
      <View className="p-4">
        <Text className="text-2xl font-medium text-center mb-6">
          Select Payment Method
        </Text>

        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.name}
            className={`flex-row items-center py-3 px-4 rounded-lg mb-3 border-2 ${
              watch('paymentMethod') === method.name 
                ? "border-primary bg-blue-50" 
                : "border-gray-200 bg-white"
            }`}
            onPress={() => {
              setValue('paymentMethod', method.name);
              closeSheet();
            }}
          >
            <Text className="text-lg font-medium flex-1">{method.name}</Text>
            {watch('paymentMethod') === method.name && (
              <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
                <View className="w-3 h-3 bg-white rounded-full" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>, 
      { snapPoints: ["50%"] }
    );
  };

  useEffect(() => {
    handleOpenPaymentMethods();
  }, []);

  const onSubmit = async (data: any) => {
    console.log("Purchase Submitted:", {
      ...data,
      packageId: id,
      packageProvider: pkg?.provider
    });
    reset();

    openLoading(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.push("/purchaseSuccess");
        return true;
      },
      "Processing Payment..."
    );
  };

  if (!pkg) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <Header title="Package Not Found" showBackButton={true} />
        <Text className="text-center mt-10">Package not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Purchase Package" showBackButton={true} />
      <ScrollView className="px-4 mt-4">
        {/* Package Info */}
        <View className="bg-gray-100 py-3 px-4 rounded-lg mb-4">
          <Text className="text-xl font-semibold">
            {pkg.provider} Package
          </Text>
          <Text className="text-gray-600">
            {pkg.minutes ? `${pkg.minutes} mins` : pkg.data} / {pkg.duration} days
          </Text>
          <Text className="text-primary font-bold mt-2">${pkg.price}</Text>
        </View>

        {/* Payment Method */}
        <View className="mb-4">
          <Text className="text-lg font-medium mb-2">Payment Method</Text>
          <Controller
            control={control}
            name="paymentMethod"
            render={({ field: { value } }) => (
              <TouchableOpacity 
                className="bg-gray-100 active:border-2 focus:border-2 active:border-primary  focus:border-primary   py-3 px-4 rounded-lg flex-row justify-between items-center"
                onPress={handleOpenPaymentMethods}
              >
                <Text className={`text-lg ${value ? 'text-black' : 'text-gray-400'}`}>
                  {value || "Select Payment Method"}
                </Text>
                <ChevronRight size={20} color={value ? "black" : "gray"} />
              </TouchableOpacity>
            )}
          />
          {errors.paymentMethod && (
            <Text className="text-red-500 mt-1">
              {errors.paymentMethod.message}
            </Text>
          )}
        </View>

        {/* Sender Number */}
        <View className="mb-4">
          <Text className="text-lg font-medium mb-2">Sender Number</Text>
          <Controller
            control={control}
            name="senderNumber"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className={`bg-gray-100 py-3 px-4 rounded-lg text-lg border border-gray-300 active:border-2 focus:border-2 active:border-primary  focus:border-primary ${
                  errors.senderNumber ? 'border border-red-500' : ''
                }`}
                placeholder="Enter sender number"
                keyboardType="numeric"
                maxLength={9}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.senderNumber && (
            <Text className="text-red-500 mt-1">
              {errors.senderNumber.message}
            </Text>
          )}
        </View>

        {/* Receiver Number */}
        <View className="mb-4">
          <Text className="text-lg font-medium mb-2">Receiver Number</Text>
          <Controller
            control={control}
            name="receiverNumber"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className={`bg-gray-100 py-3 px-4 rounded-lg text-lg border border-gray-300 active:border-2 focus:border-2 active:border-primary  focus:border-primary  ${
                  errors.receiverNumber ? 'border border-red-500' : ''
                }`}
                placeholder="Enter receiver number"
                keyboardType="numeric"
                maxLength={9}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.receiverNumber && (
            <Text className="text-red-500 mt-1">
              {errors.receiverNumber.message}
            </Text>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-primary py-3 px-4 rounded-lg mt-10"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Complete Purchase
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
    <LoadingModal 
      />
    </>
  );
}