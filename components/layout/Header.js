'use client';

import { formatHeaderDate } from '@/lib/utils';

export default function Header({ selectedDate }) {
  const headerText = formatHeaderDate(selectedDate || new Date());

  // Derive greeting based on current time (for the user's actual time, not selected date)
  const hour = new Date().getHours();
  let greeting = 'Good evening';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';

  return (
    <header className="flex items-center justify-between px-6 py-6 pt-12 bg-white">
      <div>
        <h1 className="text-[28px] font-bold text-gray-900 tracking-tight leading-tight">
          {greeting}, Alex!
        </h1>
        <p className="text-[15px] text-gray-500 font-medium mt-1">
          {headerText}
        </p>
      </div>
      
      <div className="w-[52px] h-[52px] rounded-full overflow-hidden border-[3px] border-[#F5F5F5] shadow-sm flex-shrink-0 bg-gray-100 ml-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=transparent"
          alt="Profile"
          className="object-cover w-full h-full p-1"
        />
      </div>
    </header>
  );
}
