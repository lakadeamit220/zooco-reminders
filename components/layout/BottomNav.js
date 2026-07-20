'use client';

import { Home, Heart, BarChart3, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav({ onAddReminder }) {
  const pathname = usePathname();

  const leftTabs = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Favorites', href: '/favorites', icon: Heart },
  ];

  const rightTabs = [
    { name: 'Stats', href: '/stats', icon: BarChart3 },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const renderTab = (tab) => {
    const Icon = tab.icon;
    const isActive = pathname === tab.href;
    return (
      <Link
        key={tab.name}
        href={tab.href}
        className={`flex flex-col items-center justify-center space-y-0.5 transition-all duration-200 ${
          isActive ? 'text-brand-green' : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
        <span className={`text-[10px] font-medium tracking-tight ${isActive ? 'font-semibold' : ''}`}>
          {tab.name}
        </span>
      </Link>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 pb-[max(env(safe-area-inset-bottom,8px),8px)] pt-2.5 shadow-[0_-2px_12px_rgba(0,0,0,0.04)] z-30">
      <div className="flex items-center justify-around max-w-md mx-auto px-4">
        {leftTabs.map(renderTab)}

        {/* Center "+ reminders" capsule button */}
        <button
          onClick={onAddReminder}
          className="flex items-center space-x-1.5 bg-gray-900 text-white px-5 py-2.5 rounded-full text-[13px] font-semibold tracking-tight shadow-md hover:bg-gray-800 active:scale-95 transition-all -mt-1"
        >
          <span className="text-[16px] leading-none">+</span>
          <span>reminders</span>
        </button>

        {rightTabs.map(renderTab)}
      </div>
    </nav>
  );
}
