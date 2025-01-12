import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PRIMARY_COLOR = "#1F5FD9";

interface TopThreeUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  exp: number;
  percentage: number;
}

interface Props {
  users: TopThreeUser[];
}

const TopThreeLeaderboard: React.FC<Props> = ({ users }) => {
  const paddedUsers = [...users.slice(0, 3)];
  while (paddedUsers.length < 3) {
    paddedUsers.push(null);
  }

  const [second, first, third] = [paddedUsers[1], paddedUsers[0], paddedUsers[2]];

  const renderUser = (user: TopThreeUser | null, rank: number) => {
    if (!user) return <View style={{ width: 80 }} />;

    const rankColors = {
      1: '#FFD700', // Gold
      2: '#C0C0C0', // Silver
      3: '#CD7F32', // Bronze
    };

    const avatarSize = rank === 1 ? 72 : 56;
    const badgeSize = rank === 1 ? 28 : 24;
    const fontSize = rank === 1 ? 16 : 14;

    return (
      <View style={[
        styles.userContainer,
        rank === 1 ? styles.firstPlaceContainer : 
        rank === 2 ? styles.secondPlaceContainer : 
        styles.thirdPlaceContainer
      ]}>
        <View style={[
          styles.avatarContainer,
          { 
            width: avatarSize,
            height: avatarSize,
            borderColor: rankColors[rank as keyof typeof rankColors],
            borderWidth: rank === 1 ? 3 : 2,
          }
        ]}>
          <Image
            source={{ uri: user.avatar }}
            style={[styles.avatar, { width: avatarSize - 8, height: avatarSize - 8 }]}
          />
          <View 
            style={[
              styles.badge,
              { 
                backgroundColor: rankColors[rank as keyof typeof rankColors],
                width: badgeSize,
                height: badgeSize,
                bottom: -badgeSize/3,
                left: '50%',
                transform: [{ translateX: -badgeSize/2 }]
              }
            ]}
          >
            <Text style={[styles.rank, { fontSize }]}>{rank}</Text>
          </View>
        </View>
        <Text style={[
          styles.name,
          { fontSize: rank === 1 ? 14 : 12, marginTop: badgeSize/2 }
        ]} numberOfLines={1}>
          {user.name}
        </Text>
        <Text style={[
          styles.score,
          { color: rankColors[rank as keyof typeof rankColors] }
        ]} className='font-bold'>
          {user.percentage.toFixed(2)}%
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderUser(second, 2)}
      {renderUser(first, 1)}
      {renderUser(third, 3)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  userContainer: {
    alignItems: 'center',
    width: '30%',
  },
  firstPlaceContainer: {
    marginBottom: 0,
    transform: [{ scale: 1.05 }]
  },
  secondPlaceContainer: {
    marginTop: 16,
  },
  thirdPlaceContainer: {
    marginTop: 16,
  },
  avatarContainer: {
    position: 'relative',
    borderRadius: 999,
    padding: 4,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  avatar: {
    borderRadius: 999,
  },
  badge: {
    position: 'absolute',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  rank: {
    color: '#1F1F1F',
    fontWeight: 'bold',
    textShadowColor: 'rgba(255,255,255,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  name: {
    color: 'white',
    fontWeight: '600',
    marginBottom: 2,
    textAlign: 'center',
  },
  score: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default TopThreeLeaderboard;
