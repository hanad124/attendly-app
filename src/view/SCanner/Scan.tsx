import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { View, StyleSheet, AppState, Platform, SafeAreaView, StatusBar } from 'react-native';
import { CameraView } from "expo-camera";
import { Overlay } from "./Overlay";
import { Header } from '@/components/shared/Header';

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
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <SafeAreaView style={styles.safeArea}>
        <Header title="Scan QR Code" showBackButton={true} />
        <View style={styles.cameraContainer}>
          <CameraView
            style={[styles.camera, { height: '100%' }]}
            facing="back"
            onBarcodeScanned={handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          />
          <Overlay onQrDetected={qrDetected} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
    minHeight: '100%',
    minWidth: '100%',
  },
});
