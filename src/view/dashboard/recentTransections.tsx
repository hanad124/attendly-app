import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";

import hormuudLogo from "@/assets/images/providers/hormuud-logo.png";
import somtelLogo from "@/assets/images/providers/somtel-logo.png";
import somnetLogo from "@/assets/images/providers/somnet-logo.png";
import amtelLogo from "@/assets/images/providers/amtel-logo.png";
import somlinkLogo from "@/assets/images/providers/somlink-logo.png";
import { CheckCircle, ChevronRight } from "lucide-react-native";

type Transaction = {
  id: string;
  provider: string;
  logo: any;
  phoneNumber: string;
  date: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
};

const initialTransactions: Transaction[] = [
  {
    id: '1',
    provider: 'Anfac Plus',
    logo: somlinkLogo,
    phoneNumber: '+252 61 123 4567',
    date: '09.09.2023',
    amount: 14.99,
    status: 'success'
  },
  {
    id: '2',
    provider: 'Hormuud',
    logo: hormuudLogo,
    phoneNumber: '+252 90 987 6543',
    date: '15.10.2023',
    amount: 22.50,
    status: 'success'
  },
  {
    id: '3',
    provider: 'Somtel',
    logo: somtelLogo,
    phoneNumber: '+252 70 456 7890',
    date: '22.11.2023',
    amount: 18.75,
    status: 'pending'
  }
];

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View className="flex flex-row items-center justify-between mt-0 bg-white p-3 rounded-xl">
      <View className="flex flex-row items-center gap-3">
        <Image
          source={item.logo}
          className={`w-10 h-10 rounded-full mr-2`}
        />
        <View className="flex flex-col">
          <Text className={`text-base font-normal text-gray-400`}>
            {item.provider}
          </Text>
          <Text className={`text-base font-medium text-secondary`}>
            {item.phoneNumber}
          </Text>
          <Text className={`text-sm font-normal text-gray-400`}>
            {item.date}
          </Text>
        </View>
      </View>
      <View className="flex flex-col gap-1 items-end">
        <Text className="text-primary text-base font-medium">${item.amount.toFixed(2)}</Text>
        <View className="flex flex-row items-center gap-1">
          <Text className={`
            text-sm
            font-medium 
            ${item.status === 'success' ? 'text-green-600' : 
              item.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}
          `}>
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View className={`mt-6`}>
      <View className="flex flex-row items-center justify-between mb-3">
        <Text className="text-lg font-semibold text-gray-800">
          Recent Transactions
        </Text>
        <TouchableOpacity className="flex flex-row items-center gap-1">
          <Text className="text-primary text-sm font-medium">See All</Text>
          <ChevronRight size={24} color="#1F5FD9" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View className="h-1" />}
      />
    </View>
  );
}