import { useAuthStore } from '@/stores/auth';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const { isAuthenticated, checkAuth } = useAuthStore();

  // Make sure auth is initialized
  useEffect(() => {
    checkAuth();
  }, []);

  return isAuthenticated ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}