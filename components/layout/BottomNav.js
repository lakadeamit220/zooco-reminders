'use client';

import { Calendar, Bell, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { name: 'Today', href: '/', icon: Calendar },
    { name: 'Activity', href: '/activity', icon: Bell },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 pb-[max(env(safe-area-inset-bottom,12px),12px)] pt-3 shadow-[0_-2px_12px_rgba(0,0,0,0.03)] z-30">
      {/* We leave the right-most area slightly open so it doesn't clash with the FAB */}
      <div className="flex justify-between items-center w-[65%] ml-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;

          return (
            <Link 
              key={tab.name} 
              href={tab.href}
              className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${
                isActive ? 'text-brand-green scale-105' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[11px] font-medium tracking-tight ${isActive ? 'font-bold' : ''}`}>
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
