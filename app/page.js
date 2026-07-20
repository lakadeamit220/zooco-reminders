'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import CalendarStrip from '@/components/ui/CalendarStrip';
import ReminderList from '@/components/reminders/ReminderList';
import EmptyState from '@/components/ui/EmptyState';
import ReminderModal from '@/components/reminders/ReminderModal';
import BottomNav from '@/components/layout/BottomNav';
import { useReminders } from '@/hooks/useReminders';

export default function Home() {
  const {
    selectedDate,
    setSelectedDate,
    pendingReminders,
    completedReminders,
    getTimeSlot,
    totalCount,
    toggleReminder,
    deleteReminder,
    addReminder,
    editReminder,
  } = useReminders();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);

  const handleOpenAdd = () => {
    setEditingReminder(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (reminder) => {
    setEditingReminder(reminder);
    setIsModalOpen(true);
  };

  const handleSaveReminder = (reminderData) => {
    if (editingReminder) {
      editReminder(reminderData.id, reminderData);
    } else {
      addReminder(reminderData);
    }
  };

  return (
    <main className="min-h-screen bg-bg-page flex flex-col relative pb-20">
      <Header />

      {/* Calendar + Streak Container */}
      <CalendarStrip selectedDate={selectedDate} onSelectDate={setSelectedDate} />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto w-full max-w-md mx-auto">
        {totalCount > 0 ? (
          <ReminderList
            pendingReminders={pendingReminders}
            completedReminders={completedReminders}
            getTimeSlot={getTimeSlot}
            onToggle={toggleReminder}
            onCardClick={handleOpenEdit}
          />
        ) : (
          <EmptyState filter="All" />
        )}
      </div>

      {/* Bottom Navigation with integrated + reminders button */}
      <BottomNav onAddReminder={handleOpenAdd} />

      {/* Add/Edit Reminder Modal */}
      <ReminderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveReminder}
        onDelete={deleteReminder}
        initialData={editingReminder}
      />
    </main>
  );
}
