'use client';

import { useReminderStore } from '@/store/useReminderStore';
import { Flame } from 'lucide-react';

export default function StreakCounter() {
  const streak = useReminderStore((state) => state.streak);

  if (streak === 0) return null;

  return (
    <div className="flex items-center space-x-1.5 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100 shadow-sm">
      <Flame size={16} className="text-orange-500" strokeWidth={2.5} />
      <span className="text-[13px] font-bold text-orange-700 tracking-tight">
        {streak} Day Streak
      </span>
    </div>
  );
}
