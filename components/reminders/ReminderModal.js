'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, PawPrint, ChevronDown, Calendar, Clock, Repeat } from 'lucide-react';
import toast from 'react-hot-toast';

const PET_OPTIONS = ['Browny', 'Sheru', 'Moti', 'Coco'];
const CATEGORY_OPTIONS = ['General', 'Health', 'Food', 'Exercise', 'Grooming'];
const FREQUENCY_OPTIONS = ['Everyday', 'Weekly', 'Monthly', 'Once'];

export default function ReminderModal({ isOpen, onClose, onSave, onDelete, initialData }) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [petName, setPetName] = useState('Browny');
  const [category, setCategory] = useState('General');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [time, setTime] = useState('12:00');
  const [frequency, setFrequency] = useState('Everyday');
  const [showEndDate, setShowEndDate] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const MAX_TITLE_LENGTH = 80;

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title || '');
        setNotes(initialData.notes || '');
        setPetName(initialData.petName || 'Browny');
        setCategory(initialData.category || 'General');
        setStartDate(initialData.startDate || new Date().toISOString().split('T')[0]);
        setEndDate(initialData.endDate || '');
        setTime(initialData.time || '12:00');
        setFrequency(initialData.frequency || 'Everyday');
        setShowEndDate(!!initialData.endDate);
        setShowNotes(!!initialData.notes);
      } else {
        setTitle('');
        setNotes('');
        setPetName('Browny');
        setCategory('General');
        setStartDate(new Date().toISOString().split('T')[0]);
        setEndDate('');
        setTime('12:00');
        setFrequency('Everyday');
        setShowEndDate(false);
        setShowNotes(false);
      }
    }
  }, [initialData, isOpen]);

  const handleSave = () => {
    if (!title.trim()) {
      toast.error('Please enter a reminder title');
      return;
    }
    onSave({
      id: initialData ? initialData.id : Date.now().toString(),
      title: title.trim(),
      notes: notes.trim(),
      petName,
      category,
      startDate,
      endDate: showEndDate ? endDate : '',
      time,
      frequency,
      iconName: category === 'Food' ? 'Bone' : category === 'Health' ? 'Pill' : category === 'Exercise' ? 'Activity' : 'Activity',
      completed: initialData ? initialData.completed : false,
      createdAt: initialData ? initialData.createdAt : new Date().toISOString(),
    });
    onClose();
  };

  const isEditMode = !!initialData;

  // Format date for display "DD.MM.YYYY"
  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Format time for display "12:06 pm"
  const formatDisplayTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':').map(Number);
    const ampm = hours >= 12 ? 'pm' : 'am';
    const displayHour = hours % 12 || 12;
    return `${displayHour}:${String(minutes).padStart(2, '0')} ${ampm}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed inset-0 z-50 bg-white flex flex-col overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 pt-12 border-b border-gray-100">
            <button
              onClick={onClose}
              className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={22} />
            </button>
            <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">
              {isEditMode ? 'Edit Reminder' : 'Add Reminder'}
            </h2>
            <button
              onClick={handleSave}
              className="text-[15px] font-semibold text-brand-green hover:text-green-700 transition-colors"
            >
              Save
            </button>
          </div>

          {/* Select Pet / Category */}
          <div className="flex px-5 py-4 space-x-3 border-b border-gray-100">
            {/* Select Pet */}
            <div className="flex-1 relative">
              <label className="text-[11px] text-gray-400 font-medium mb-1 block">Select Pet</label>
              <div className="flex items-center space-x-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-200">
                <PawPrint size={16} className="text-brand-green flex-shrink-0" />
                <select
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] font-semibold text-gray-800 outline-none appearance-none cursor-pointer"
                >
                  {PET_OPTIONS.map((pet) => (
                    <option key={pet} value={pet}>{pet}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
              </div>
            </div>

            {/* Select Category */}
            <div className="flex-1 relative">
              <label className="text-[11px] text-gray-400 font-medium mb-1 block">Select Category</label>
              <div className="flex items-center space-x-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-200">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] font-semibold text-gray-800 outline-none appearance-none cursor-pointer"
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* Reminder Info Section */}
          <div className="px-5 pt-5">
            <div className="bg-brand-green text-white text-[13px] font-bold px-4 py-2.5 rounded-xl mb-4 tracking-tight">
              Reminder Info
            </div>

            <label className="text-[13px] text-gray-500 font-medium mb-2 block">
              Set a reminder for...
            </label>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Type here..."
                maxLength={MAX_TITLE_LENGTH}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green text-[15px] text-gray-900 bg-gray-50 transition-all"
                autoFocus
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-400">
                {title.length}/{MAX_TITLE_LENGTH}
              </span>
            </div>

            {/* Add Notes */}
            {!showNotes ? (
              <button
                onClick={() => setShowNotes(true)}
                className="flex items-center space-x-1.5 text-[13px] font-semibold text-brand-green mb-4 hover:text-green-700 transition-colors"
              >
                <span>Add Notes (Optional)</span>
                <span className="text-[11px] bg-green-50 px-2 py-0.5 rounded-full text-brand-green font-bold">Add</span>
              </button>
            ) : (
              <div className="mb-4">
                <label className="text-[13px] text-gray-500 font-medium mb-2 block">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add extra details..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green text-[14px] text-gray-900 bg-gray-50 resize-none transition-all"
                />
              </div>
            )}
          </div>

          {/* Reminder Settings Section */}
          <div className="px-5 pt-2 pb-8">
            <div className="bg-brand-green text-white text-[13px] font-bold px-4 py-2.5 rounded-xl mb-4 tracking-tight">
              Reminder Settings
            </div>

            {/* Start Date */}
            <div className="mb-4">
              <label className="text-[13px] text-gray-500 font-medium mb-2 block">Start Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green text-[15px] text-gray-900 bg-gray-50 appearance-none transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Calendar size={18} />
                </div>
              </div>
            </div>

            {/* Add End Date */}
            {!showEndDate ? (
              <button
                onClick={() => setShowEndDate(true)}
                className="text-[13px] font-semibold text-brand-green mb-4 block hover:text-green-700 transition-colors"
              >
                + Add End Date
              </button>
            ) : (
              <div className="mb-4">
                <label className="text-[13px] text-gray-500 font-medium mb-2 block">End Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green text-[15px] text-gray-900 bg-gray-50 appearance-none transition-all"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <Calendar size={18} />
                  </div>
                </div>
              </div>
            )}

            {/* Reminder Time */}
            <div className="mb-4">
              <label className="text-[13px] text-gray-500 font-medium mb-2 block">Reminder Time</label>
              <div className="relative">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green text-[15px] text-gray-900 bg-gray-50 appearance-none transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Clock size={18} />
                </div>
              </div>
            </div>

            {/* Reminder Frequency */}
            <div className="mb-4">
              <label className="text-[13px] text-gray-500 font-medium mb-1 block">Reminder Frequency</label>
              <p className="text-[11px] text-gray-400 mb-2">How often should this reminder repeat?</p>
              <div className="relative">
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green text-[15px] text-gray-900 bg-gray-50 appearance-none cursor-pointer transition-all"
                >
                  {FREQUENCY_OPTIONS.map((freq) => (
                    <option key={freq} value={freq}>{freq}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            {/* Delete button (edit mode only) */}
            {isEditMode && onDelete && (
              <button
                type="button"
                onClick={() => {
                  onDelete(initialData.id);
                  onClose();
                }}
                className="w-full py-3.5 bg-red-50 text-red-600 rounded-xl font-bold text-[15px] hover:bg-red-100 active:scale-[0.98] transition-all mt-4"
              >
                Delete Reminder
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
