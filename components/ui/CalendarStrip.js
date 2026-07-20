'use client';

import { useEffect, useRef } from 'react';
import { generateCalendarDays } from '@/lib/utils';
import { isSameDay, format } from 'date-fns';
import { useReminderStore } from '@/store/useReminderStore';
import { Zap, ChevronDown } from 'lucide-react';

export default function CalendarStrip({ selectedDate, onSelectDate }) {
  const days = generateCalendarDays(selectedDate, 7);
  const scrollRef = useRef(null);
  const streak = useReminderStore((state) => state.streak);

  useEffect(() => {
    if (scrollRef.current) {
      const activeElement = scrollRef.current.querySelector('[data-active="true"]');
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [selectedDate]);

  // Month label from selected date
  const monthLabel = format(new Date(selectedDate), 'MMMM yyyy').toLowerCase();

  return (
    <div className="mx-6 mb-4 rounded-[20px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #43A047 0%, #66BB6A 100%)' }}>
      {/* Top row: streak label + month */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div className="flex items-center space-x-1.5">
          <Zap size={14} className="text-yellow-300" fill="currentColor" />
          <span className="text-[12px] font-semibold text-white/90 tracking-tight">
            your streaks
          </span>
        </div>
        <span className="text-[12px] font-semibold text-white/80 tracking-tight">
          {monthLabel}
        </span>
      </div>

      {/* Calendar days */}
      <div className="px-4 pb-2">
        <div
          ref={scrollRef}
          className="flex justify-between items-center"
        >
          {days.map((day, idx) => {
            const isSelected = isSameDay(new Date(day.fullDate), new Date(selectedDate));
            // 2-letter day abbreviation
            const dayAbbrev = day.dayName.slice(0, 2);

            return (
              <button
                key={idx}
                data-active={isSelected}
                onClick={() => onSelectDate(new Date(day.fullDate))}
                className="flex flex-col items-center justify-center relative"
              >
                <span className="text-[11px] font-semibold text-white/70 mb-1.5">
                  {dayAbbrev}
                </span>
                <div
                  className={`w-[38px] h-[38px] rounded-full flex items-center justify-center text-[16px] font-bold transition-all duration-200 ${
                    isSelected
                      ? 'bg-white text-green-700 shadow-md'
                      : 'bg-white/15 text-white hover:bg-white/25'
                  }`}
                >
                  {day.dayNumber}
                </div>

                {/* Streak connector line (show between days that are part of streak) */}
                {idx < days.length - 1 && streak > 0 && (
                  <div className="absolute right-[-50%] top-[28px] w-[calc(100%-38px)] h-[2px] bg-white/30 z-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Expand chevron */}
      <div className="flex justify-center pb-2">
        <ChevronDown size={18} className="text-white/50" />
      </div>
    </div>
  );
}
