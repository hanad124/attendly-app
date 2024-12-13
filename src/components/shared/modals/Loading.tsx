import React, { useRef, useState, useEffect } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { Loader2 } from "lucide-react-native";
import { useLoadingModal } from "@/stores/loadingModal";

export function LoadingModal() {
  const { isOpen, message, operation, closeLoading } = useLoadingModal();
  const [isLoading, setIsLoading] = useState(false);

  const rotateAnim = useRef(new Animated.Value(0)).current;

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    if (isOpen && operation) {
      setIsLoading(true);

      operation()
        .then(() => {
          closeLoading();
        })
        .catch((error) => {
          console.error("Loading operation failed", error);
          closeLoading();
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen, operation]);

  useEffect(() => {
    let animation: Animated.CompositeAnimation;

    if (isLoading) {
      animation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animation.start();
    }

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [isLoading, rotateAnim]);

  if (!isOpen) return null;

  return (
    <Animated.View className="absolute inset-0 bg-black/60 backdrop-blur-lg backdrop-filter z-50 items-center justify-center">
      <View className="px-10 w-full flex justify-center items-center">
        <View className="bg-white p-10 mx-10 w-full rounded-2xl items-center shadow-2xl">
          <Animated.View
            style={{
              transform: [
                {
                  rotate: rotation,
                },
              ],
            }}
          >
            <Loader2 size={40} color="#3B82F6" strokeWidth={2} />
          </Animated.View>

          <Text className="text-lg text-gray-700 font-semibold mt-4">
            {message}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
