import { View, Text } from "react-native";
import React from "react";
import { Phone } from "lucide-react-native";

export default function List() {
  return (
    <View className=" mx-6 mt-5">
      <View 
        className="flex flex-row justify-between rounded-md p-6
        "
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
          backgroundColor: 'white'
        }}
      >
        <View className="flex flex-row gap-6">
          <View className="flex justify-center items-center border rounded-full p-4 border-gray-300">
            <Phone />
          </View>
          <View>
            <Text>Voice Pack</Text>
            <View className="flex flex-row gap-2 mt-2 items-center">
              <Text className="font-bold text-xl">100 mins</Text>
              <Text className="font-light">/ 30 days</Text>
            </View>
          </View>
        </View>
        <View>
          <Text className="font-semibold text-blue-600 text-xl">$9.99</Text>
        </View>
      </View>
      <View 
        className="flex flex-row justify-between rounded-md p-6 mt-7
        "
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
          backgroundColor: 'white'
        }}
      >
        <View className="flex flex-row gap-6">
          <View className="flex justify-center items-center border rounded-full p-4 border-gray-300">
            <Phone />
          </View>
          <View>
            <Text>Voice Pack</Text>
            <View className="flex flex-row gap-2 mt-2 items-center">
              <Text className="font-bold text-xl">200 mins</Text>
              <Text className="font-light">/ 30 days</Text>
            </View>
          </View>
        </View>
        <View>
          <Text className="font-semibold text-blue-600 text-xl">$14.99</Text>
        </View>
      </View>
      <View 
        className="flex flex-row justify-between rounded-md p-6 mt-7
        "
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
          backgroundColor: 'white'
        }}
      >
        <View className="flex flex-row gap-6">
          <View className="flex justify-center items-center border rounded-full p-4 border-gray-300">
            <Phone />
          </View>
          <View>
            <Text>Voice Pack</Text>
            <View className="flex flex-row gap-2 mt-2 items-center">
              <Text className="font-bold text-xl">300 mins</Text>
              <Text className="font-light">/ 30 days</Text>
            </View>
          </View>
        </View>
        <View>
          <Text className="font-semibold text-blue-600 text-xl">$19.99</Text>
        </View>
      </View>
      <View 
        className="flex flex-row justify-between rounded-md p-6 mt-7
        "
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
          backgroundColor: 'white'
        }}
      >
        <View className="flex flex-row gap-6">
          <View className="flex justify-center items-center border rounded-full p-4 border-gray-300">
            <Phone />
          </View>
          <View>
            <Text>Voice Pack</Text>
            <View className="flex flex-row gap-2 mt-2 items-center">
              <Text className="font-bold text-xl">500 mins</Text>
              <Text className="font-light">/ 30 days</Text>
            </View>
          </View>
        </View>
        <View>
          <Text className="font-semibold text-blue-600 text-xl">$29.99</Text>
        </View>
      </View>
      <View 
        className="flex flex-row justify-between rounded-md p-6 mt-7
        "
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
          backgroundColor: 'white'
        }}
      >
        <View className="flex flex-row gap-6">
          <View className="flex justify-center items-center border rounded-full p-4 border-gray-300">
            <Phone />
          </View>
          <View>
            <Text>Voice Pack</Text>
            <View className="flex flex-row gap-2 mt-2 items-center">
              <Text className="font-bold text-xl">750 mins</Text>
              <Text className="font-light">/ 30 days</Text>
            </View>
          </View>
        </View>
        <View>
          <Text className="font-semibold text-blue-600 text-xl">$39.99</Text>
        </View>
      </View>
    </View>
  );
}
