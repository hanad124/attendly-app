import { create } from "zustand";
import {
  createSchedule,
  deleteSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
} from "@/services/schecule";

export const useScheduleStore = create<any>((set, get) => ({
  schedules: [],
  schedule: null,
  loading: false,
  error: null,
  getSchedule: async () => {
    set({ loading: true });
    try {
      const schedules = await getSchedules();

      set({
        schedules,
      });
    } catch (error) {
      set({ error });
    } finally {
      set({ loading: false });
    }
  },
  getScheduleById: async (id: string) => {
    set({ loading: true });
    try {
      const schedule = await getScheduleById(id);
      set({ schedule });
    } catch (error) {
      set({ error });
    } finally {
      set({ loading: false });
    }
  },
  createSchedule: async (schedule: any) => {
    set({ loading: true });
    try {
      const newSchedule = await createSchedule(schedule);
      const currentSchedules = get().schedules;
      set({ schedules: [...currentSchedules, newSchedule] });
    } catch (error) {
      set({ error });
    } finally {
      set({ loading: false });
    }
  },
  updateSchedule: async (id: string, schedule: any) => {
    set({ loading: true });
    try {
      const updatedSchedule = await updateSchedule(id, schedule);
      const currentSchedules = get().schedules;
      set({
        schedules: currentSchedules.map((s: any) =>
          s._id === id ? updatedSchedule : s
        ),
      });
    } catch (error) {
      set({ error });
    } finally {
      set({ loading: false });
    }
  },
  deleteSchedule: async (id: string) => {
    set({ loading: true });
    try {
      await deleteSchedule(id);
      const currentSchedules = get().schedules;
      set({ schedules: currentSchedules.filter((s: any) => s._id !== id) });
    } catch (error) {
      set({ error });
    } finally {
      set({ loading: false });
    }
  },

  initialize: async () => {
    try {
      await useScheduleStore.getState().getSchedule();
      set({ initialized: true });
    } catch (error) {
      console.error("Failed to initialize schedule state:", error);
      set({ initialized: true });
    }
  },
}));
