'use client';

import { motion } from 'framer-motion';
import { DynamicIcon } from '@/components/ui/IconMap';
import { PawPrint, Clock, Repeat, Check } from 'lucide-react';
import { format } from 'date-fns';

function formatDisplayTime(timeString) {
  // Convert "14:00" to "2:00pm"
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  return format(date, 'h:mma').toLowerCase();
}

export default function ReminderCard({ reminder, onToggle, onClick }) {
  const isCompleted = reminder.completed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileTap={{ scale: 0.97 }}
      className={`relative w-full rounded-[16px] p-4 mb-3 flex items-start justify-between transition-all duration-300 border ${
        isCompleted
          ? 'bg-green-50/50 border-green-100'
          : 'bg-white border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
      }`}
      onClick={() => onClick && onClick(reminder)}
    >
      <div className="flex-1 pr-4">
        {/* Title */}
        <h3 className={`text-[16px] font-semibold tracking-tight mb-2 ${
          isCompleted ? 'text-gray-400 line-through decoration-green-400/60 decoration-2' : 'text-gray-900'
        }`}>
          {reminder.title}
        </h3>

        {/* Meta Row: Pet, Time, Frequency */}
        <div className="flex items-center space-x-4">
          {reminder.petName && (
            <div className="flex items-center space-x-1">
              <PawPrint size={12} className="text-gray-400" />
              <span className="text-[12px] text-gray-400 font-medium">
                For {reminder.petName}
              </span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Clock size={12} className="text-gray-400" />
            <span className="text-[12px] text-gray-400 font-medium">
              At {formatDisplayTime(reminder.time)}
            </span>
          </div>
          {reminder.frequency && (
            <div className="flex items-center space-x-1">
              <Repeat size={12} className="text-gray-400" />
              <span className="text-[12px] text-gray-400 font-medium">
                {reminder.frequency}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Checkbox / Completion Toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle(reminder.id);
        }}
        className={`flex-shrink-0 mt-1 flex items-center justify-center w-7 h-7 rounded-full border-[2px] transition-all duration-300 ${
          isCompleted
            ? 'bg-brand-green border-brand-green text-white'
            : 'border-gray-300 bg-transparent hover:border-brand-green'
        }`}
      >
        {isCompleted && <Check size={14} strokeWidth={3} />}
      </button>
    </motion.div>
  );
}
