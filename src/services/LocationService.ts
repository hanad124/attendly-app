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
      return status === "granted";
    } catch (error) {
      console.error("Error requesting location permission:", error);
      return false;
    }
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
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

  async getAccurateLocation(maxAttempts: number = 5, accuracyThreshold: number = 15): Promise<Location.LocationObject> {
    let bestLocation: Location.LocationObject | null = null;
    let attempts = 0;
    let locations: Location.LocationObject[] = [];

    while (attempts < maxAttempts) {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        mayShowUserSettingsDialog: true
      });

      console.log(`Attempt ${attempts + 1} accuracy:`, location.coords.accuracy);
      locations.push(location);

      // If we get a reading with accuracy better than our threshold, use it immediately
      if (location.coords.accuracy <= accuracyThreshold) {
        return location;
      }

      // Keep track of the best accuracy we've seen
      if (!bestLocation || location.coords.accuracy < bestLocation.coords.accuracy) {
        bestLocation = location;
      }

      attempts++;
      
      // Wait a bit longer between attempts
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // If we have multiple readings, use a weighted average of the best ones
    if (locations.length > 1) {
      // Sort by accuracy (best first)
      locations.sort((a, b) => a.coords.accuracy - b.coords.accuracy);
      
      // Take the top 3 most accurate readings or all if less than 3
      const bestReadings = locations.slice(0, Math.min(3, locations.length));
      
      // Calculate weighted average based on accuracy
      const totalWeight = bestReadings.reduce((sum, loc) => sum + (1 / loc.coords.accuracy), 0);
      const weightedLat = bestReadings.reduce((sum, loc) => sum + (loc.coords.latitude / loc.coords.accuracy), 0) / totalWeight;
      const weightedLong = bestReadings.reduce((sum, loc) => sum + (loc.coords.longitude / loc.coords.accuracy), 0) / totalWeight;
      
      // Use the accuracy of the best reading
      const bestAccuracy = bestReadings[0].coords.accuracy;
      
      return {
        ...bestLocation!,
        coords: {
          ...bestLocation!.coords,
          latitude: weightedLat,
          longitude: weightedLong,
          accuracy: bestAccuracy
        }
      };
    }

    // If we only have one reading, return the best one we got
    return bestLocation!;
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

      // Wait for location services to be enabled
      const providerStatus = await Location.hasServicesEnabledAsync();
      if (!providerStatus) {
        throw new Error('Location services are disabled');
      }

      // Get accurate location with multiple attempts
      console.log('Getting accurate position...');
      const location = await this.getAccurateLocation(5, 15); // 5 attempts, 15 meters accuracy threshold

      console.log('Final position:', {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy,
      });

      const distance = this.calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        this.locationConfig.targetLatitude,
        this.locationConfig.targetLongitude
      );

      // More lenient accuracy check - 20 meters maximum acceptable accuracy
      if (location.coords.accuracy > 20) {
        throw new Error('Could not get accurate enough location. Please try again in a better location.');
      }

      console.log('Distance calculation:', {
        currentLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy,
        },
        targetLocation: {
          latitude: this.locationConfig.targetLatitude,
          longitude: this.locationConfig.targetLongitude,
        },
        distance: Math.round(distance),
        allowedRadius: this.locationConfig.allowedRadius,
      });

      // Adjust the allowed radius based on the accuracy
      const adjustedRadius = this.locationConfig.allowedRadius + (location.coords.accuracy / 2);

      return {
        isAllowed: distance <= adjustedRadius,
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
