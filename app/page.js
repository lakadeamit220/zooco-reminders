'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import StreakCounter from '@/components/ui/StreakCounter';
import CalendarStrip from '@/components/ui/CalendarStrip';
import FilterBar from '@/components/ui/FilterBar';
import ReminderList from '@/components/reminders/ReminderList';
import EmptyState from '@/components/ui/EmptyState';
import FAB from '@/components/ui/FAB';
import ReminderModal from '@/components/reminders/ReminderModal';
import BottomNav from '@/components/layout/BottomNav';
import { useReminders } from '@/hooks/useReminders';

export default function Home() {
  const {
    selectedDate,
    setSelectedDate,
    currentFilter,
    setCurrentFilter,
    groupedReminders,
    totalFilteredCount,
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
      <Header selectedDate={selectedDate} />
      
      {/* Dynamic Streak Counter */}
      <div className="px-6 pb-2 -mt-2">
        <StreakCounter />
      </div>

      {/* Navigation and Filters */}
      <CalendarStrip selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      <FilterBar currentFilter={currentFilter} onFilterChange={setCurrentFilter} />
      
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto w-full max-w-md mx-auto">
        {totalFilteredCount > 0 ? (
          <ReminderList 
            groupedReminders={groupedReminders} 
            onToggle={toggleReminder} 
            onCardClick={handleOpenEdit} 
          />
        ) : (
          <EmptyState filter={currentFilter} />
        )}
      </div>

      {/* Floating UI */}
      <FAB onClick={handleOpenAdd} />
      <BottomNav />

      {/* Modals */}
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
