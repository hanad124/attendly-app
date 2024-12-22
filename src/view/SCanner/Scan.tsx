import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { View, StyleSheet, AppState, Platform, SafeAreaView, StatusBar } from 'react-native';
import { CameraView } from "expo-camera";
import { Overlay } from "./Overlay";

export default function Scan() {
  const [qrDetected, setQrDetected] = useState(false);
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  const router = useRouter();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (data && !qrLock.current) {
      qrLock.current = true;
      setQrDetected(true);
      
      // Log the QR code data
      console.log('QR Code detected:', data);

      // Navigate to the next screen
      router.push(`/purchaseSuccess`);
      
      // Reset after animation (2 seconds)
      setTimeout(() => {
        setQrDetected(false);
        qrLock.current = false;
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
      <Overlay onQrDetected={qrDetected} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
