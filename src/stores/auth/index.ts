import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { authService } from '@/services/auth';

interface Ability {
  action: string;
  subject: string;
}

interface Role {
  _id: string;
  name: string;
  ability: Ability[];
  createdBy: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  email: string;
  role: string | Role;
  // isEmailVerified: boolean;
  username: string;
  status: string;
  dateCreated: string;
  lastLogin: string;
  id: string;
}

interface AuthState {
  user: User | null | any;
  isAuthenticated: boolean;
  initialized: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

// Type for persisted state
type PersistedState = Pick<AuthState, 'user' | 'isAuthenticated'>;

// Create a custom storage object for SecureStore
const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

// Create the store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      initialized: false,

      checkAuth: async () => {
        try {
          const user = await authService.getCurrentUser();
          if (user) {
            set({ user, isAuthenticated: true });
          } else {
            set({ user: null, isAuthenticated: false });
          }
        } catch (error) {
          console.error('Check auth error:', error);
          set({ user: null, isAuthenticated: false });
        }
      },

      initialize: async () => {
        try {
          await get().checkAuth();
          set({ initialized: true });
        } catch (error) {
          console.error('Failed to initialize auth state:', error);
          set({ initialized: true });
        }
      },

      login: async (username: string, password: string) => {
        try {
          const response = await authService.login({ username, password });
          if (response.user) {
            set({ 
              user: response.user,
              isAuthenticated: true,
              initialized: true 
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },

      logout: async () => {
        try {
          await authService.logout();
          set({ 
            user: null, 
            isAuthenticated: false,
            initialized: true 
          });
        } catch (error) {
          console.error('Logout error:', error);
        }
      }
    }),
    {
      name: 'auth_store',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state): PersistedState => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);