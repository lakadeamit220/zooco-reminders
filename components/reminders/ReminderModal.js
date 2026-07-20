'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DynamicIcon } from '@/components/ui/IconMap';
import toast from 'react-hot-toast';

export default function ReminderModal({ isOpen, onClose, onSave, onDelete, initialData }) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('09:00');
  const [iconName, setIconName] = useState('Activity');

  // Pre-fill fields when modal opens for editing
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title);
        setTime(initialData.time);
        setIconName(initialData.iconName || 'Activity');
      } else {
        setTitle('');
        setTime('09:00');
        setIconName('Activity');
      }
    }
  }, [initialData, isOpen]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    onSave({
      id: initialData ? initialData.id : Date.now().toString(),
      title: title.trim(),
      time,
      iconName,
      completed: initialData ? initialData.completed : false,
      createdAt: initialData ? initialData.createdAt : new Date().toISOString(),
    });
    onClose();
  };

  const isEditMode = !!initialData;
  const availableIcons = ['Activity', 'Bone', 'Pill', 'Sun', 'Moon', 'Sunrise', 'Sunset'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-end sm:items-center bg-black/40 backdrop-blur-sm">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full sm:w-[420px] bg-white rounded-t-3xl sm:rounded-3xl p-6 pb-[max(env(safe-area-inset-bottom,24px),24px)] shadow-xl flex flex-col max-h-[90vh] overflow-y-auto hide-scrollbar"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                {isEditMode ? 'Edit Reminder' : 'New Reminder'}
              </h2>
              <button 
                onClick={onClose} 
                className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 active:scale-95 transition-all"
              >
                <DynamicIcon name="X" size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">What needs to be done?</label>
                <input
                  type="text"
                  placeholder="e.g. Walk the dog"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent text-[16px] text-gray-900 transition-shadow"
                  autoFocus
                />
              </div>

              {/* Time Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Time</label>
                <div className="relative">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3.5 pl-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent text-[16px] text-gray-900 appearance-none bg-white transition-shadow"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <DynamicIcon name="Calendar" size={20} />
                  </div>
                </div>
              </div>
              
              {/* Icon Picker */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category Icon</label>
                <div className="flex flex-wrap gap-2.5">
                  {availableIcons.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setIconName(icon)}
                      className={`p-3 rounded-[14px] border transition-all duration-200 ${
                        iconName === icon 
                          ? 'bg-brand-green/10 border-brand-green text-brand-green scale-105 shadow-sm' 
                          : 'bg-white border-gray-200 text-gray-500 hover:border-brand-green/50 hover:bg-gray-50'
                      }`}
                    >
                      <DynamicIcon name={icon} size={24} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3 pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-brand-green text-white rounded-[14px] font-bold text-[16px] hover:bg-brand-green-dark active:scale-[0.98] transition-all shadow-md"
                >
                  {isEditMode ? 'Save Changes' : 'Create Reminder'}
                </button>
                
                {isEditMode && onDelete && (
                  <button
                    type="button"
                    onClick={() => {
                      onDelete(initialData.id);
                      onClose();
                    }}
                    className="w-full py-3.5 bg-red-50 text-red-600 rounded-[14px] font-bold text-[16px] hover:bg-red-100 active:scale-[0.98] transition-all"
                  >
                    Delete Reminder
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
