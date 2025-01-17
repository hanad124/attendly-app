import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { CameraView } from "expo-camera";
import { Header } from "@/components/shared/Header";
import LocationService from "../../services/LocationService";
import * as Location from "expo-location";
import * as Device from "expo-device";
import { useVerifyAttendanceMutation } from "@/stores/RTK/attendance";
import { QRSessionData } from "@/types/attendance";
import { useAuthStore } from "@/stores/auth";

export default function Scan() {
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const locationWatchId = useRef<Location.LocationSubscription | null>(null);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const [verifyAttendance] = useVerifyAttendanceMutation();

  const openLocationSettings = () => {
    Platform.OS === "ios"
      ? Linking.openURL("app-settings:")
      : Linking.openSettings();
  };

  const startLocationWatch = async () => {
    try {
      // Stop any existing watch
      if (locationWatchId.current) {
        locationWatchId.current.remove();
      }

      // Start new watch with balanced accuracy
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 3000,
          distanceInterval: 10,
        },
        (location) => {
          // Removed unnecessary updateCurrentLocation call
        }
      );

      locationWatchId.current = subscription;
    } catch (error) {
      console.error("Error watching location:", error);
    }
  };

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (!isScanning || isProcessing) return;

    try {
      setIsProcessing(true);
      setIsScanning(false);
      setError(null);
      setStatus("Checking location services...");

      // Check location services
      const enabled = await Location.hasServicesEnabledAsync();
      setIsLocationEnabled(enabled);

      if (!enabled) {
        throw new Error("Please enable location services");
      }

      const { status: permStatus } =
        await Location.getForegroundPermissionsAsync();
      if (permStatus !== "granted") {
        const { status: newStatus } =
          await Location.requestForegroundPermissionsAsync();
        if (newStatus !== "granted") {
          throw new Error("Location permission required");
        }
      }

      // Parse QR data
      setStatus("Verifying QR code...");
      let qrSessionData: QRSessionData;
      try {
        const cleanData = data
          .trim()
          .replace(/'/g, '"')
          .replace(/^['"]|['"]$/g, "");
        qrSessionData = JSON.parse(cleanData);
      } catch (error) {
        throw new Error("Invalid QR code");
      }

      // Validate QR data
      if (!qrSessionData.id || !qrSessionData.location?.coordinates) {
        throw new Error("Invalid QR code data");
      }

      // Check time validity
      setStatus("Verifying time validity...");
      const now = new Date();
      const validFrom = new Date(qrSessionData.valid_from);
      const validUntil = new Date(qrSessionData.valid_until);

      if (now < validFrom || now > validUntil) {
        throw new Error("QR code expired or not yet valid");
      }

      // Set location configuration and request permission
      LocationService.setLocationConfig({
        targetLatitude: qrSessionData.location.coordinates[0],
        targetLongitude: qrSessionData.location.coordinates[1],
        allowedRadius: qrSessionData.allowed_radius || 16,
      });

      // Request location permission
      const hasPermission = await LocationService.requestLocationPermission();
      if (!hasPermission) {
        throw new Error("Location permission denied");
      }

      // Get location with balanced accuracy
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const locationCheck = await LocationService.isWithinAllowedRadius();

      // Only get high accuracy location if we're close to the target
      if (!locationCheck.isAllowed && locationCheck.distance < 50) {
        setStatus("Getting precise location...");
        const preciseLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const finalCheck = await LocationService.isWithinAllowedRadius();
        if (!finalCheck.isAllowed) {
          throw new Error(`Distance: ${finalCheck.distance}m. Move closer.`);
        }
      } else if (!locationCheck.isAllowed) {
        throw new Error(`Distance: ${locationCheck.distance}m. Move closer.`);
      }

      // Start watching location for better accuracy
      await startLocationWatch();

      // Submit attendance
      setStatus("Marking attendance...");
      const result = await verifyAttendance({
        student_id: user.id,
        qr_session_id: qrSessionData.id,
        location: {
          type: "Point",
          coordinates: [location.coords.latitude, location.coords.longitude],
        },
        device_info: {
          device_id: Device.modelName || "Unknown Device",
          device_type: Platform.OS,
          ip_address: "192.168.1.1",
        },
      }).unwrap();

      if (result.verification?.verification_status === "Success") {
        router.push({
          pathname: "/attendance-success",
          params: {
            alreadyVerified: result.details?.already_verified || false,
            message: result.message || "Attendance marked",
          },
        });
      } else {
        throw new Error(result.message || "Verification failed");
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Verification failed. Try again."
      );
      setIsScanning(true);
    } finally {
      setIsProcessing(false);
      setStatus("");
      if (locationWatchId.current) {
        locationWatchId.current.remove();
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <Header title="Scan QR Code" showBackButton={true} />
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={
            isScanning && !isProcessing ? handleBarCodeScanned : undefined
          }
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        />
        {isProcessing && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.statusText}>{status}</Text>
          </View>
        )}
      </SafeAreaView>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          {!isLocationEnabled && (
            <TouchableOpacity
              style={styles.enableButton}
              onPress={openLocationSettings}
            >
              <Text style={styles.buttonText}>Enable Location</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  errorContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  errorText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
  },
  enableButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
