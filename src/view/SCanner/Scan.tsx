import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { View, StyleSheet, AppState, Platform, SafeAreaView, StatusBar, Text, Linking, TouchableOpacity } from 'react-native';
import { CameraView } from "expo-camera";
import { Overlay } from "./Overlay";
import { Header } from '@/components/shared/Header';
import LocationService from '../../services/LocationService';
import * as Location from 'expo-location';

export default function Scan() {
  const [qrDetected, setQrDetected] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  const router = useRouter();

  const checkLocationServices = async () => {
    try {
      const enabled = await Location.hasServicesEnabledAsync();
      console.log('Location services enabled:', enabled);
      setIsLocationEnabled(enabled);
      
      if (!enabled) {
        setLocationError('Please enable location services to scan QR codes');
        return false;
      }
      
      const { status } = await Location.getForegroundPermissionsAsync();
      console.log('Location permission status:', status);
      
      if (status !== 'granted') {
        const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
        if (newStatus !== 'granted') {
          setLocationError('Location permission is required to scan QR codes');
          return false;
        }
      }
      
      setLocationError(null);
      return true;
    } catch (error) {
      console.error('Error checking location services:', error);
      setLocationError('Failed to check location services');
      return false;
    }
  };

  const openLocationSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", async (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
        await checkLocationServices();
      }
      appState.current = nextAppState;
    });

    LocationService.setLocationConfig({
      targetLatitude: 2.033500,   
      targetLongitude: 45.319611, 
      allowedRadius: 16, 
    });

    checkLocationServices();

    return () => {
      subscription.remove();
    };
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (data && !qrLock.current) {
      try {
        qrLock.current = true;

        const locationServicesEnabled = await checkLocationServices();
        if (!locationServicesEnabled) {
          qrLock.current = false;
          return;
        }

        const locationCheck = await LocationService.isWithinAllowedRadius();
        console.log('Location check result:', locationCheck);
        
        if (!locationCheck.isAllowed) {
          setLocationError(
            locationCheck.error || 
            `You are ${locationCheck.distance}m away from the required location. Please move closer to scan.`
          );
          qrLock.current = false;
          return;
        }

        setQrDetected(true);
        setLocationError(null);
        
        console.log('QR Code detected:', data);
        
        await new Promise(resolve => setTimeout(resolve, 500));
        router.push(`/attendance-success`);
        
        setTimeout(() => {
          setQrDetected(false);
          qrLock.current = false;
        }, 3000);
      } catch (error) {
        setLocationError('Failed to verify location. Please try again.');
        console.error('Location verification failed:', error);
        qrLock.current = false;
      }
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
      {locationError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{locationError}</Text>
          {!isLocationEnabled && (
            <TouchableOpacity 
              style={styles.enableButton}
              onPress={openLocationSettings}
            >
              <Text style={styles.buttonText}>Enable Location Services</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
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
  errorContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  enableButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
