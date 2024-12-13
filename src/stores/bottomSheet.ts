import { create } from "zustand";
import { ReactNode } from "react";
import { BottomSheetProps as RNBottomSheetProps } from "@gorhom/bottom-sheet";

interface BottomSheetState {
  isOpen: boolean;
  content: ReactNode;
  options: Partial<Omit<RNBottomSheetProps, "children">>;
  openSheet: (content: ReactNode, options?: Partial<Omit<RNBottomSheetProps, "children">>) => void;
  closeSheet: () => void;
}

export const useBottomSheet = create<BottomSheetState>((set) => ({
  isOpen: false,
  content: null,
  options: {},
  openSheet: (content, options = {}) => set({ isOpen: true, content, options }),
  closeSheet: () => set({ isOpen: false, content: null, options: {} }),
}));

