import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onGoBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = true,
  onGoBack 
}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
      return;
    }

    try {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        console.warn('Cannot go back: No previous screen in the navigation stack');
      }
    } catch (error) {
      console.error('Error navigating back:', error);
    }
  };

  return (
    <View 
      style={{
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 12, 
        paddingHorizontal: 8, 
        backgroundColor: 'white',
        // borderBottomWidth: 0.5,
        // borderBottomColor: '#E0E0E0'
      }}
    >
      {showBackButton && (
        <TouchableOpacity 
          onPress={handleGoBack} 
          style={{ 
            marginRight: 12,
            padding: 8  
          }}
        >
          <ChevronLeft color="black" size={24} />
        </TouchableOpacity>
      )}
      <Text style={{ 
        fontSize: 18, 
        fontWeight: 'semibold',
        flex: 1  
      }}>
        {title}
      </Text>
    </View>
  );
};
