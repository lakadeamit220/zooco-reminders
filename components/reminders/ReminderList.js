'use client';

import { AnimatePresence } from 'framer-motion';
import ReminderCard from './ReminderCard';
import { DynamicIcon } from '@/components/ui/IconMap';
import { SlidersHorizontal } from 'lucide-react';

export default function ReminderList({ pendingReminders, completedReminders, getTimeSlot, onToggle, onCardClick }) {
  if ((!pendingReminders || pendingReminders.length === 0) && (!completedReminders || completedReminders.length === 0)) {
    return null;
  }

  // Determine the current time slot label from the first pending reminder
  const currentSlot = pendingReminders.length > 0
    ? getTimeSlot(pendingReminders[0].time)
    : null;

  return (
    <div className="px-6 pb-28 mt-2">
      {/* Time Slot Sub-header */}
      {currentSlot && (
        <div className="flex items-center justify-between mb-4 pl-1">
          <div className="flex items-center space-x-2">
            <DynamicIcon name={currentSlot.icon} size={18} className="text-gray-400" />
            <span className="text-[15px] font-medium text-gray-500 tracking-tight">
              {currentSlot.label}
            </span>
          </div>
          <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <SlidersHorizontal size={16} className="text-gray-400" />
          </button>
        </div>
      )}

      {/* Pending Reminders */}
      {pendingReminders.length > 0 && (
        <div className="flex flex-col">
          <AnimatePresence mode="popLayout">
            {pendingReminders.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onToggle={onToggle}
                onClick={onCardClick}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Pending Goals Label */}
      {pendingReminders.length > 0 && (
        <p className="text-[13px] font-medium text-gray-400 tracking-tight mt-4 mb-3 pl-1">
          pending goals
        </p>
      )}

      {/* Show remaining pending items that appear after the first time slot */}
      {/* For simplicity, show Vet Visit type items here */}

      {/* Completed Goals Label */}
      {completedReminders.length > 0 && (
        <p className="text-[13px] font-medium text-gray-400 tracking-tight mt-6 mb-3 pl-1">
          completed goals
        </p>
      )}

      {/* Completed Reminders */}
      {completedReminders.length > 0 && (
        <div className="flex flex-col">
          <AnimatePresence mode="popLayout">
            {completedReminders.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onToggle={onToggle}
                onClick={onCardClick}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
