import * as Location from 'expo-location';

interface LocationConfig {
  targetLatitude: number;
  targetLongitude: number;
  allowedRadius: number; 
}

class LocationService {
  private static instance: LocationService;
  private locationConfig: LocationConfig | null = null;

  private constructor() {}

  static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  setLocationConfig(config: LocationConfig) {
    this.locationConfig = config;
  }

  async requestLocationPermission(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; 
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }

  async isWithinAllowedRadius(): Promise<{ isAllowed: boolean; distance?: number; error?: string }> {
    try {
      if (!this.locationConfig) {
        console.error('Location configuration not set');
        throw new Error('Location configuration not set');
      }

      const { status } = await Location.getForegroundPermissionsAsync();
      console.log('Location permission status:', status);
      
      if (status !== 'granted') {
        console.error('Location permission not granted');
        throw new Error('Location permission not granted');
      }

      console.log('Getting current position...');
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      console.log('Current position:', {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const distance = this.calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        this.locationConfig.targetLatitude,
        this.locationConfig.targetLongitude
      );

      console.log('Distance calculation:', {
        currentLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        targetLocation: {
          latitude: this.locationConfig.targetLatitude,
          longitude: this.locationConfig.targetLongitude,
        },
        distance: Math.round(distance),
        allowedRadius: this.locationConfig.allowedRadius,
      });

      return {
        isAllowed: distance <= this.locationConfig.allowedRadius,
        distance: Math.round(distance),
      };
    } catch (error) {
      console.error('Location service error:', error);
      return {
        isAllowed: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}

export default LocationService.getInstance();
