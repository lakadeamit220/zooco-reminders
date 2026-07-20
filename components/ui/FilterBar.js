'use client';

export default function FilterBar({ currentFilter, onFilterChange }) {
  const tabs = ['All', 'Pending', 'Completed'];

  return (
    <div className="px-6 py-2 pb-4">
      <div className="flex space-x-1 bg-gray-100/80 p-1.5 rounded-full border border-gray-200/50">
        {tabs.map((tab) => {
          const isActive = currentFilter === tab;
          return (
            <button
              key={tab}
              onClick={() => onFilterChange(tab)}
              className={`flex-1 py-2.5 px-4 rounded-full text-[14px] font-semibold transition-all duration-300 ${
                isActive 
                  ? 'bg-white text-text-primary shadow-sm transform scale-[1.02]' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/50 active:scale-95'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}
