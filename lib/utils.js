import { format, isToday, isTomorrow, isYesterday, startOfDay } from 'date-fns';

/**
 * Formats a Date object into a readable string like "Today, Oct 12"
 */
export function formatHeaderDate(date) {
  const d = new Date(date);
  if (isToday(d)) return `Today, ${format(d, 'MMM d')}`;
  if (isTomorrow(d)) return `Tomorrow, ${format(d, 'MMM d')}`;
  if (isYesterday(d)) return `Yesterday, ${format(d, 'MMM d')}`;
  return format(d, 'EEEE, MMM d');
}

/**
 * Groups a flat array of reminders into time slots (Morning, Afternoon, etc.)
 */
export function groupRemindersByTimeSlot(reminders) {
  const groups = {
    Morning: [],
    Afternoon: [],
    Evening: [],
    Night: [],
  };

  reminders.forEach((reminder) => {
    // Expecting time format "HH:mm"
    const hour = parseInt(reminder.time.split(':')[0], 10);

    if (hour >= 5 && hour < 12) {
      groups.Morning.push(reminder);
    } else if (hour >= 12 && hour < 17) {
      groups.Afternoon.push(reminder);
    } else if (hour >= 17 && hour < 21) {
      groups.Evening.push(reminder);
    } else {
      groups.Night.push(reminder);
    }
  });

  const result = [];
  for (const [title, items] of Object.entries(groups)) {
    if (items.length > 0) {
      // Sort items chronologically by time string
      items.sort((a, b) => a.time.localeCompare(b.time));
      
      let icon = 'Sun';
      if (title === 'Morning') icon = 'Sunrise';
      if (title === 'Afternoon') icon = 'Sun';
      if (title === 'Evening') icon = 'Sunset';
      if (title === 'Night') icon = 'Moon';

      result.push({
        title,
        icon,
        data: items,
      });
    }
  }

  return result;
}

/**
 * Generates an array of dates around a selected date for the calendar strip
 */
export function generateCalendarDays(selectedDate = new Date(), daysCount = 7) {
  const result = [];
  const baseDate = new Date(selectedDate);
  // Center the selected date (e.g., 3 days before, 3 days after for 7 days total)
  baseDate.setDate(baseDate.getDate() - Math.floor(daysCount / 2));

  for (let i = 0; i < daysCount; i++) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + i);
    
    result.push({
      fullDate: startOfDay(d).toISOString(),
      dayName: format(d, 'EEE'), // e.g. "Mon"
      dayNumber: format(d, 'd'), // e.g. "12"
      isToday: isToday(d),
      isPast: startOfDay(d) < startOfDay(new Date()),
    });
  }
  
  return result;
}

/**
 * Filter reminders that fall on a specific date string
 */
export function getRemindersForDate(reminders, selectedDateIsoString) {
  // Simple check: compare date portions of ISO string, 
  // or logic depending on how you store reminder dates.
  // Assuming mockData has 'createdAt' as a proxy for the reminder's scheduled date for simplicity,
  // or we can just return all for the sake of the mock since they don't have explicit target dates in the mock yet.
  
  // For the assignment, we will assume all mock reminders belong to 'Today'
  // and in a real app, we would filter by a 'targetDate' field.
  const targetDateStr = selectedDateIsoString.split('T')[0];
  const todayStr = new Date().toISOString().split('T')[0];
  
  if (targetDateStr === todayStr) {
    return reminders; // show mock data only on 'Today'
  }
  return []; // empty on other days to show EmptyState
}
