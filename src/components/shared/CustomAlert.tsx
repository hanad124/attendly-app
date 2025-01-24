import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  primaryButton?: {
    text: string;
    onPress: () => void;
  };
  secondaryButton?: {
    text: string;
    onPress: () => void;
  };
  onClose?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  type = 'info',
  primaryButton,
  secondaryButton,
  onClose,
}) => {
  const [animation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const getTypeColor = () => {
    switch (type) {
      case 'success':
        return '#34D399';
      case 'error':
        return '#EF4444';
      case 'warning':
        return '#F59E0B';
      default:
        return '#3B82F6';
    }
  };

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
        >
          <View style={[styles.indicator, { backgroundColor: getTypeColor() }]} />
          
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>

          <View style={styles.buttonContainer}>
            {secondaryButton && (
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={secondaryButton.onPress}
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                  {secondaryButton.text}
                </Text>
              </TouchableOpacity>
            )}
            {primaryButton && (
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.primaryButton,
                  { backgroundColor: getTypeColor() },
                ]}
                onPress={primaryButton.onPress}
              >
                <Text style={[styles.buttonText, styles.primaryButtonText]}>
                  {primaryButton.text}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  indicator: {
    height: 4,
    width: '100%',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    gap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
  },
  secondaryButton: {
    backgroundColor: '#F3F4F6',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#4B5563',
  },
});

export default CustomAlert;
