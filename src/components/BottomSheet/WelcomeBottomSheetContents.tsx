import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';




type WelcomeBottomSheetContentsProps = {
  onClose: () => void;
};

export function WelcomeBottomSheetContents({ onClose }: WelcomeBottomSheetContentsProps) {
  return (
    <View >
      <Text >🎉 Congratulations! </Text>
      <Text >
        You have successfully spin up the ips-app project in the
        <Text >{  }</Text>environment 🚀
      </Text>
      <Text >Injected Environmental Variables:</Text>
      
      <Text >
        {`Your foundational setup is now complete, paving the way for seamless development and innovation. \n\nHappy coding!`}
      </Text>
      <Button
        title="OK"
        onPress={onClose}
      />
    </View>
  );
}
