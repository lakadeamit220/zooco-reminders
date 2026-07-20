'use client';

import { motion } from 'framer-motion';
import { DynamicIcon } from '@/components/ui/IconMap';

export default function FAB({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-[max(env(safe-area-inset-bottom,24px),24px)] right-6 w-14 h-14 bg-brand-green text-white rounded-full flex items-center justify-center shadow-fab z-40 transition-colors hover:bg-brand-green-dark"
      aria-label="Add Reminder"
    >
      <DynamicIcon name="Plus" size={28} strokeWidth={2.5} />
    </motion.button>
  );
}
