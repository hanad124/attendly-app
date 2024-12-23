import { create } from 'zustand';
import { authService, LoginResponse } from '@/services/auth';

interface AuthState {
  user: LoginResponse['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initialized: boolean;
  initialize: () => Promise<void>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  initialized: false,

  login: async (username: string, password: string) => {
    try {
      const response = await authService.login({ username, password });
      set({ user: response.user, isAuthenticated: true });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const isAuthenticated = await authService.isAuthenticated();
      if (isAuthenticated) {
        const user = await authService.getCurrentUser();
        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Check auth error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  initialize: async () => {
    try {
      await useAuthStore.getState().checkAuth();
      set({ initialized: true });
    } catch (error) {
      set({ initialized: true }); 
    }
  },
}));
