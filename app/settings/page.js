import Link from 'next/link';
import BottomNav from '@/components/layout/BottomNav';
import { Settings, ArrowLeft } from 'lucide-react';

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-bg-page flex flex-col items-center justify-center p-6 relative pb-20">
      <div className="bg-white p-8 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center max-w-sm w-full">
        <div className="w-16 h-16 bg-green-50 text-brand-green rounded-full flex items-center justify-center mb-4">
          <Settings size={32} strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-[15px] text-gray-500 mb-8">
          This is a placeholder page for customizing your profile and app preferences.
        </p>
        
        <Link 
          href="/"
          className="flex items-center space-x-2 bg-brand-green text-white px-6 py-3 rounded-full font-semibold hover:bg-[#3d8c40] transition-colors shadow-sm"
        >
          <ArrowLeft size={20} />
          <span>Back to Calendar</span>
        </Link>
      </div>
      
      <BottomNav />
    </main>
  );
}
