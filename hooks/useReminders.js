'use client';

import { useState, useMemo } from 'react';
import { useReminderStore } from '@/store/useReminderStore';
import { getRemindersForDate } from '@/lib/utils';

export function useReminders() {
  const store = useReminderStore();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());

  // 1. Filter by selected date
  const dateFilteredReminders = useMemo(() => {
    return getRemindersForDate(store.reminders, selectedDate);
  }, [store.reminders, selectedDate]);

  // 2. Separate into pending and completed
  const pendingReminders = useMemo(() => {
    return dateFilteredReminders
      .filter((r) => !r.completed)
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [dateFilteredReminders]);

  const completedReminders = useMemo(() => {
    return dateFilteredReminders
      .filter((r) => r.completed)
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [dateFilteredReminders]);

  // 3. Get the time slot label for the first pending reminder group
  const getTimeSlot = (time) => {
    const hour = parseInt(time.split(':')[0], 10);
    if (hour >= 5 && hour < 12) return { label: 'morning', icon: 'Sunrise' };
    if (hour >= 12 && hour < 17) return { label: 'afternoon', icon: 'Sun' };
    if (hour >= 17 && hour < 21) return { label: 'evening', icon: 'Sunset' };
    return { label: 'night', icon: 'Moon' };
  };

  return {
    selectedDate,
    setSelectedDate,
    pendingReminders,
    completedReminders,
    getTimeSlot,
    totalCount: dateFilteredReminders.length,
    toggleReminder: store.toggleReminder,
    deleteReminder: store.deleteReminder,
    addReminder: store.addReminder,
    editReminder: store.editReminder,
  };
}
