'use client';

import { AnimatePresence } from 'framer-motion';
import ReminderCard from './ReminderCard';
import { DynamicIcon } from '@/components/ui/IconMap';

export default function ReminderList({ groupedReminders, onToggle, onCardClick }) {
  if (!groupedReminders || groupedReminders.length === 0) {
    return null;
  }

  return (
    <div className="px-6 pb-28 space-y-8 mt-2">
      {groupedReminders.map((group) => (
        <div key={group.title} className="flex flex-col">
          {/* Section Header */}
          <div className="flex items-center space-x-2.5 mb-4 pl-1">
            <DynamicIcon name={group.icon} size={20} className="text-text-secondary" />
            <h2 className="text-[18px] font-bold text-gray-900 tracking-tight">
              {group.title}
            </h2>
          </div>

          {/* Cards List */}
          <div className="flex flex-col relative">
            <AnimatePresence mode="popLayout">
              {group.data.map((reminder) => (
                <ReminderCard
                  key={reminder.id}
                  reminder={reminder}
                  onToggle={onToggle}
                  onClick={onCardClick}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
}
