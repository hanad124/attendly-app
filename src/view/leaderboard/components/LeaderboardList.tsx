import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';

interface LeaderboardEntry {
  id: string;
  name: string;
  username: string;
  avatar: string;
  exp: number;
  rank: number;
}

interface Props {
  entries: LeaderboardEntry[];
}

const LeaderboardItem = ({ item }: { item: LeaderboardEntry }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '', borderRadius: 10, marginBottom: 10 }} className='shadow-none'>
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginRight: 15, width: 30, textAlign: 'center' }}>{item.rank}</Text>
    <Image 
      source={{ uri: item.avatar }} 
      style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }}
    />
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>{item.name}</Text>
      <Text style={{ fontSize: 14, color: '#666' }}>@{item.username}</Text>
    </View>
    <Text style={{ fontSize: 16 }}>{item.exp} XP</Text>
  </View>
);

const LeaderboardList: React.FC<Props> = ({ entries }) => {
  return (
    <FlatList
      data={entries}
      renderItem={({ item }) => <LeaderboardItem item={item} />}
      keyExtractor={item => item.id}
      contentContainerStyle={{ paddingVertical: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default LeaderboardList;
