import { create } from 'zustand';

interface LoadingModalState {
  isOpen: boolean;
  message: string;
  operation: (() => Promise<any>) | null;
  openLoading: (
    operation: () => Promise<any>, 
    message?: string
  ) => void;
  closeLoading: () => void;
}

export const useLoadingModal = create<LoadingModalState>((set) => ({
  isOpen: false,
  message: 'Processing...',
  operation: null,
  openLoading: (operation, message = 'Processing...') => 
    set({ 
      isOpen: true, 
      operation, 
      message 
    }),
  closeLoading: () => 
    set({ 
      isOpen: false, 
      operation: null, 
      message: 'Processing...' 
    }),
}));