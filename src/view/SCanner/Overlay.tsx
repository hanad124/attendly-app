import { Canvas, DiffRect, rect, rrect, Group, Paint, Path, Skia } from "@shopify/react-native-skia";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useDerivedValue, withRepeat, withTiming, useSharedValue, withSpring, Easing, cancelAnimation, withSequence } from "react-native-reanimated";
import { interpolate } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const innerDimension = 280;
const cornerLength = 40;
const cornerWidth = 4;
const cornerRadius = 0;  // Remove corner radius for sharp edges

const outer = rrect(rect(0, 0, width, height), 0, 0);
const inner = rrect(
  rect(
    width / 2 - innerDimension / 2,
    height / 2 - innerDimension / 2,
    innerDimension,
    innerDimension
  ),
  cornerRadius,
  cornerRadius
);

// Create corner paths for L-shaped corners
const createCornerPath = () => {
  const path = Skia.Path.Make();
  path.moveTo(0, cornerLength);
  path.lineTo(0, 0);
  path.lineTo(cornerLength, 0);
  return path;
};

interface OverlayProps {
  onQrDetected?: boolean;
}

export const Overlay = ({ onQrDetected = false }: OverlayProps) => {
  const progress = useSharedValue(0);
  const scanLineY = useSharedValue(0);
  const scale = useSharedValue(1);
  const successScan = useSharedValue(0);

  useEffect(() => {
    if (onQrDetected) {
      // Cancel the normal scanning animation
      cancelAnimation(scanLineY);
      
      // Scale animation
      scale.value = withSequence(
        withSpring(0.95),
        withSpring(1.05),
        withSpring(1)
      );

      // Success scan line animation
      successScan.value = 0;
      successScan.value = withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease)
      });
    } else {
      // Normal scanning animation
      scale.value = 1;
      successScan.value = 0;
      scanLineY.value = withRepeat(
        withTiming(innerDimension, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease)
        }),
        -1,
        true
      );
    }
  }, [onQrDetected]);

  const opacity = useDerivedValue(() => {
    return interpolate(progress.value, [0, 1], [0.3, 0.8]);
  }, [progress]);

  const frameTransform = useDerivedValue(() => {
    return [{ scale: scale.value }];
  }, [scale]);

  const scanLineTransform = useDerivedValue(() => {
    return [{ translateY: scanLineY.value }];
  }, [scanLineY]);

  const successLineY = useDerivedValue(() => {
    return interpolate(successScan.value, [0, 1], [0, innerDimension]);
  }, [successScan]);

  const successLineTransform = useDerivedValue(() => {
    return [{ translateY: successLineY.value }];
  }, [successLineY]);

  return (
    <Canvas
      style={[
        Platform.OS === "android" ? { flex: 1 } : StyleSheet.absoluteFillObject,
        { backgroundColor: "transparent" }
      ]}
    >
      <DiffRect inner={inner} outer={outer} color="rgba(0, 0, 0, 0.7)" />
      
      <Group transform={frameTransform}>
        {/* Top Left Corner */}
        <Path 
          path={createCornerPath()}
          transform={[
            { translateX: width / 2 - innerDimension / 2 },
            { translateY: height / 2 - innerDimension / 2 }
          ]}
        >
          <Paint style="stroke" strokeWidth={cornerWidth} color="#00ff00" opacity={opacity} />
        </Path>
        
        {/* Top Right Corner */}
        <Path 
          path={createCornerPath()}
          transform={[
            { translateX: width / 2 + innerDimension / 2 },
            { translateY: height / 2 - innerDimension / 2 },
            { rotate: Math.PI / 2 }
          ]}
        >
          <Paint style="stroke" strokeWidth={cornerWidth} color="#00ff00" opacity={opacity} />
        </Path>
        
        {/* Bottom Right Corner */}
        <Path 
          path={createCornerPath()}
          transform={[
            { translateX: width / 2 + innerDimension / 2 },
            { translateY: height / 2 + innerDimension / 2 },
            { rotate: Math.PI }
          ]}
        >
          <Paint style="stroke" strokeWidth={cornerWidth} color="#00ff00" opacity={opacity} />
        </Path>
        
        {/* Bottom Left Corner */}
        <Path 
          path={createCornerPath()}
          transform={[
            { translateX: width / 2 - innerDimension / 2 },
            { translateY: height / 2 + innerDimension / 2 },
            { rotate: -Math.PI / 2 }
          ]}
        >
          <Paint style="stroke" strokeWidth={cornerWidth} color="#00ff00" opacity={opacity} />
        </Path>

        {/* Scanning Line */}
        {!onQrDetected && (
          <Path
            path={Skia.Path.Make()
              .moveTo(width / 2 - innerDimension / 2, height / 2 - innerDimension / 2)
              .lineTo(width / 2 + innerDimension / 2, height / 2 - innerDimension / 2)}
            transform={scanLineTransform}
          >
            <Paint style="stroke" strokeWidth={2} color="#00ff00" opacity={0.8} />
          </Path>
        )}

        {/* Success Scan Line */}
        {onQrDetected && (
          <Path
            path={Skia.Path.Make()
              .moveTo(width / 2 - innerDimension / 2, height / 2 - innerDimension / 2)
              .lineTo(width / 2 + innerDimension / 2, height / 2 - innerDimension / 2)}
            transform={successLineTransform}
          >
            <Paint style="stroke" strokeWidth={3} color="#00ff00" opacity={1} />
          </Path>
        )}
      </Group>
    </Canvas>
  );
};