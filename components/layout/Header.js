'use client';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-5 pt-12 bg-white">
      <h1 className="text-[22px] font-bold text-gray-900 tracking-tight lowercase">
        daily reminders
      </h1>
      <button className="text-[14px] font-semibold text-brand-green tracking-tight">
        view all
      </button>
    </header>
  );
}
