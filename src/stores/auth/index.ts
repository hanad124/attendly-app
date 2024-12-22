import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';

interface User {
  id: string;
  username: string;
  name: string;
  studentId: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  initialized: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

// Type for persisted state
type PersistedState = Pick<AuthState, 'user' | 'isAuthenticated'>;

// Mock student data
const MOCK_USERS = [
  {
    id: '1',
    username: 'student1',
    password: 'password123', // In real app, this would be hashed
    name: 'John Doe',
    studentId: 'STD001'
  },
  {
    id: '2',
    username: 'student2',
    password: 'password123',
    name: 'Jane Smith',
    studentId: 'STD002'
  }
];

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
    (set) => ({
      user: null,
      isAuthenticated: false,
      initialized: false,

      initialize: async () => {
        try {
          const storedAuth = await SecureStore.getItemAsync('auth_store');
          if (storedAuth) {
            const { state } = JSON.parse(storedAuth);
            set({ ...state, initialized: true });
          } else {
            set({ initialized: true });
          }
        } catch (error) {
          console.error('Failed to initialize auth state:', error);
          set({ initialized: true });
        }
      },

      login: async (username: string, password: string) => {
        try {
          const user = MOCK_USERS.find(u => u.username === username && u.password === password);
          
          if (user) {
            const { password: _, ...userWithoutPassword } = user;
            set({ 
              user: userWithoutPassword, 
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