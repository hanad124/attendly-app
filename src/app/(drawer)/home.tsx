import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Drawer Home Screen</Text>
      <Link href="/(tabs)">Go to Tabs</Link>
    </View>
  );
}