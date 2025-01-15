import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { View, StyleSheet, AppState, Platform, SafeAreaView, StatusBar, Text, Linking, TouchableOpacity } from 'react-native';
import { CameraView } from "expo-camera";
import { Overlay } from "./Overlay";
import { Header } from '@/components/shared/Header';
import LocationService from '../../services/LocationService';
import * as Location from 'expo-location';
import * as Device from 'expo-device';
import { useVerifyAttendanceMutation } from '@/stores/RTK/attendance';
import { QRSessionData } from '@/types/attendance';
import { useAuthStore } from "@/stores/auth";


export default function Scan() {
  const [qrDetected, setQrDetected] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const user = useAuthStore((state) => state.user)


  const router = useRouter();
  const [verifyAttendance] = useVerifyAttendanceMutation();

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
        console.log('Raw QR code data:', data);

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

        // Try to parse QR session data
        let qrSessionData: QRSessionData;
        try {
          // Clean the data: trim and replace single quotes with double quotes
          const cleanData = data
            .trim()
            .replace(/'/g, '"')
            .replace(/^['"]|['"]$/g, '');
          qrSessionData = JSON.parse(cleanData);
          console.log('Parsed QR session data:', qrSessionData);
        } catch (parseError) {
          console.error('Failed to parse QR code data:', parseError);
          setLocationError('Invalid QR code format. Please try scanning again.');
          qrLock.current = false;
          return;
        }

        // Validate required fields
        if (!qrSessionData.id || !qrSessionData.valid_from || !qrSessionData.valid_until) {
          setLocationError('Invalid QR code: missing required information');
          qrLock.current = false;
          return;
        }
        
        // Verify if QR code is still valid
        const localTime = new Date('2025-01-14T18:39:31+03:00');
        
        // Convert the times to comparable format
        const currentUTC = new Date(localTime.toISOString());
        const validFromUTC = new Date(qrSessionData.valid_from.replace('Z', '+00:00'));
        const validUntilUTC = new Date(qrSessionData.valid_until.replace('Z', '+00:00'));
        
        console.log('Time validation:', {
          localTime: localTime.toISOString(),
          currentUTC: currentUTC.toISOString(),
          valid_from: validFromUTC.toISOString(),
          valid_until: validUntilUTC.toISOString(),
          // Show readable times in local timezone
          localTimeReadable: localTime.toLocaleTimeString(),
          currentUTCReadable: currentUTC.toLocaleTimeString(),
          validFromReadable: validFromUTC.toLocaleTimeString(),
          validUntilReadable: validUntilUTC.toLocaleTimeString()
        });

        if (currentUTC < validFromUTC || currentUTC > validUntilUTC) {
          const timeFormat = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          });

          setLocationError(
            `QR code ${
              currentUTC < validFromUTC ? 'is not yet valid' : 'has expired'
            }. Valid between ${timeFormat.format(validFromUTC)} and ${timeFormat.format(validUntilUTC)}`
          );
          qrLock.current = false;
          return;
        }

        // Get current location
        const location = await Location.getCurrentPositionAsync({});
        
        // Prepare verification payload
        const verificationPayload = {
          student_id: user.id,
          qr_session_id: qrSessionData.id,
          location: {
            type: "Point",
            coordinates: [location.coords.latitude, location.coords.longitude]
          },
          device_info: {
            device_id: Device.modelName || 'Unknown Device',
            device_type: Platform.OS,
            ip_address: "192.168.1.1" // You might want to get this dynamically
          }
        };

        console.log('Sending verification payload:', verificationPayload);

        // Call the verification API
        const result = await verifyAttendance(verificationPayload).unwrap();
        console.log('Verification result:', result);

        // Check verification status
        if (result.verification?.verification_status === 'Success') {
          // All validations passed
          setQrDetected(true);
          setLocationError(null);
          
          await new Promise(resolve => setTimeout(resolve, 500));
          router.push({
            pathname: '/attendance-success',
            params: { 
              alreadyVerified: result.details?.already_verified || false,
              message: result.message || 'Attendance marked successfully'
            }
          });
          
          setTimeout(() => {
            setQrDetected(false);
            qrLock.current = false;
          }, 3000);
          return;
        }
        
        // Handle verification failure
        let errorMessage = 'Attendance verification failed: ';
        
        if (!result.verification?.verification_details?.location_valid) {
          const distance = Math.round(result.verification?.verification_details?.distance_from_target);
          errorMessage = `You are ${distance}m away from the class location. Please move closer and try again.`;
        } else if (!result.verification?.verification_details?.time_valid) {
          errorMessage = 'The QR code has expired or is not yet valid. Please get a new QR code.';
        } else {
          errorMessage = result.message || 'Verification failed. Please try again or contact support.';
        }
        
        setLocationError(errorMessage);
        qrLock.current = false;
      } catch (error) {
        console.error('Attendance verification failed:', error);
        if (error instanceof Error) {
          setLocationError(`Failed to verify attendance: ${error.message}`);
        } else {
          setLocationError('Failed to verify attendance. Please try again.');
        }
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
