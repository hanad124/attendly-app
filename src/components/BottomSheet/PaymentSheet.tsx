import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';




type PaymentSheetProps = {
  onClose: () => void;
};

export function PaymentSheet({ onClose }: PaymentSheetProps) {
  return (
    <View >
      <Text className='text-center text-xl font-normal'>Choose Payment Method</Text>
      
      <Button
        title="OK"
        onPress={onClose}
      />
    </View>
  );
}
