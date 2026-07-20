'use client';

import { motion } from 'framer-motion';
import { DynamicIcon } from '@/components/ui/IconMap';

export default function EmptyState({ filter }) {
  let title = "No reminders here";
  let subtitle = "You're all caught up for the day! Enjoy your free time.";
  let iconName = "Check";

  if (filter === 'Pending') {
    title = "Nothing pending";
    subtitle = "You have completed all your tasks for this view.";
    iconName = "Check";
  } else if (filter === 'Completed') {
    title = "No completed tasks yet";
    subtitle = "Check off some reminders to see them appear here.";
    iconName = "Activity";
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center w-full py-24 px-6 text-center"
    >
      <div className="w-24 h-24 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
        <DynamicIcon name={iconName} size={42} strokeWidth={2} className="text-brand-green" />
      </div>
      <h3 className="text-[22px] font-bold text-gray-900 mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-[15px] text-text-secondary max-w-[260px] leading-relaxed">
        {subtitle}
      </p>
    </motion.div>
  );
}
