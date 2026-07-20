'use client';

import { useEffect, useRef } from 'react';
import { generateCalendarDays } from '@/lib/utils';
import { isSameDay } from 'date-fns';

export default function CalendarStrip({ selectedDate, onSelectDate }) {
  // Generate 14 days centered around the selected date
  const days = generateCalendarDays(selectedDate, 14);
  const scrollRef = useRef(null);

  // Auto-scroll to center the active day
  useEffect(() => {
    if (scrollRef.current) {
      const activeElement = scrollRef.current.querySelector('[data-active="true"]');
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [selectedDate]);

  return (
    <div className="w-full px-6 py-4">
      <div 
        ref={scrollRef}
        className="flex space-x-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-2"
      >
        {days.map((day, idx) => {
          const isSelected = isSameDay(new Date(day.fullDate), new Date(selectedDate));
          
          return (
            <button
              key={idx}
              data-active={isSelected}
              onClick={() => onSelectDate(new Date(day.fullDate))}
              className={`snap-center flex-shrink-0 flex flex-col items-center justify-center w-[62px] h-[82px] rounded-2xl border transition-all duration-300 ${
                isSelected
                  ? 'bg-brand-green border-brand-green text-white shadow-md transform scale-105'
                  : 'bg-white border-border-light text-gray-800 active:scale-95'
              } ${day.isPast && !isSelected ? 'opacity-50' : 'opacity-100'}`}
            >
              <span className={`text-[13px] font-medium mb-1 ${isSelected ? 'text-white/90' : 'text-text-secondary'}`}>
                {day.dayName}
              </span>
              <span className={`text-[20px] font-bold tracking-tight ${isSelected ? 'text-white' : 'text-text-primary'}`}>
                {day.dayNumber}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
