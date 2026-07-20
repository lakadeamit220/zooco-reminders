'use client';

import { useState, useMemo } from 'react';
import { useReminderStore } from '@/store/useReminderStore';
import { getRemindersForDate, groupRemindersByTimeSlot } from '@/lib/utils';

export function useReminders() {
  const store = useReminderStore();
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentFilter, setCurrentFilter] = useState('All'); // 'All', 'Pending', 'Completed'

  // 1. Filter by selected date
  const dateFilteredReminders = useMemo(() => {
    return getRemindersForDate(store.reminders, selectedDate.toISOString());
  }, [store.reminders, selectedDate]);

  // 2. Filter by status (All, Pending, Completed)
  const statusFilteredReminders = useMemo(() => {
    return dateFilteredReminders.filter((reminder) => {
      if (currentFilter === 'Pending') return !reminder.completed;
      if (currentFilter === 'Completed') return reminder.completed;
      return true; // 'All'
    });
  }, [dateFilteredReminders, currentFilter]);

  // 3. Group by time slots (Morning, Afternoon, Evening, Night)
  const groupedReminders = useMemo(() => {
    return groupRemindersByTimeSlot(statusFilteredReminders);
  }, [statusFilteredReminders]);

  return {
    selectedDate,
    setSelectedDate,
    currentFilter,
    setCurrentFilter,
    groupedReminders,
    totalFilteredCount: statusFilteredReminders.length,
    // Expose store actions for convenience
    toggleReminder: store.toggleReminder,
    deleteReminder: store.deleteReminder,
    addReminder: store.addReminder,
    editReminder: store.editReminder,
  };
}
