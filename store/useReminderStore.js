import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockReminders } from '../data/mockData';

export const useReminderStore = create(
  persist(
    (set) => ({
      reminders: mockReminders,
      streak: 5,
      addReminder: (reminder) =>
        set((state) => ({
          reminders: [...state.reminders, reminder],
        })),
      toggleReminder: (id) =>
        set((state) => ({
          reminders: state.reminders.map((r) =>
            r.id === id ? { ...r, completed: !r.completed } : r
          ),
        })),
      deleteReminder: (id) =>
        set((state) => ({
          reminders: state.reminders.filter((r) => r.id !== id),
        })),
      editReminder: (id, updatedReminder) =>
        set((state) => ({
          reminders: state.reminders.map((r) =>
            r.id === id ? { ...r, ...updatedReminder } : r
          ),
        })),
    }),
    {
      name: 'zooco-reminders-pune-storage',
    }
  )
);
