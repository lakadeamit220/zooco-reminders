'use client';

import { motion } from 'framer-motion';
import { DynamicIcon } from '@/components/ui/IconMap';

export default function ReminderCard({ reminder, onToggle, onClick }) {
  const isCompleted = reminder.completed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileTap={{ scale: 0.97 }}
      className={`relative w-full rounded-[20px] p-4 mb-3 flex items-center justify-between transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border ${
        isCompleted 
          ? 'bg-brand-green/5 border-brand-green/20' 
          : 'bg-white border-border-light hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
      }`}
      onClick={() => onClick && onClick(reminder)}
    >
      <div className="flex items-center space-x-4">
        {/* Icon Container */}
        <div className={`flex items-center justify-center w-[50px] h-[50px] rounded-[16px] transition-colors duration-300 ${
          isCompleted ? 'bg-brand-green text-white' : 'bg-gray-100/80 text-gray-600'
        }`}>
          <DynamicIcon name={reminder.iconName} size={24} strokeWidth={2.5} />
        </div>

        {/* Text Content */}
        <div className="flex flex-col">
          <h3 className={`text-[17px] font-semibold tracking-tight transition-all duration-300 ${
            isCompleted ? 'text-gray-500 line-through decoration-brand-green/40 decoration-2' : 'text-gray-900'
          }`}>
            {reminder.title}
          </h3>
          <p className={`text-[14px] font-medium mt-0.5 transition-colors duration-300 ${
            isCompleted ? 'text-brand-green/80' : 'text-text-secondary'
          }`}>
            {reminder.time}
          </p>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle(reminder.id);
        }}
        className={`flex items-center justify-center w-8 h-8 rounded-full border-[2.5px] transition-all duration-300 z-10 ${
          isCompleted 
            ? 'bg-brand-green border-brand-green text-white shadow-sm transform scale-110' 
            : 'border-gray-300 bg-transparent hover:border-brand-green'
        }`}
      >
        <DynamicIcon 
          name="Check" 
          size={16} 
          strokeWidth={3.5} 
          className={`transition-opacity duration-300 ${isCompleted ? 'opacity-100' : 'opacity-0'}`} 
        />
      </button>
    </motion.div>
  );
}
