// Date formatting and manipulation utilities for Digital Nomad Daily

/**
 * Get a random date between start and end dates
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date
 * @returns {Date} Random date between start and end
 */
export const getRandomDate = (startDate, endDate) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const randomTime = start + Math.random() * (end - start);
  return new Date(randomTime);
};

/**
 * Format a date into a readable string
 * @param {Date} date - Date to format
 * @param {string} format - Optional format ('full', 'short', 'iso')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'full') => {
  const options = {
    full: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
    short: {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    },
    iso: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }
  };

  return new Date(date).toLocaleDateString('en-US', options[format] || options.full);
};

/**
 * Check if a date is today
 * @param {Date} date - Date to check
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  const today = new Date();
  return new Date(date).toDateString() === today.toDateString();
};

/**
 * Get the date for yesterday
 * @param {Date} date - Reference date
 * @returns {Date} Yesterday's date
 */
export const getYesterday = (date = new Date()) => {
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};

/**
 * Get the date for tomorrow
 * @param {Date} date - Reference date
 * @returns {Date} Tomorrow's date
 */
export const getTomorrow = (date = new Date()) => {
  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

/**
 * Check if a date is within a valid range
 * @param {Date} date - Date to check
 * @param {Date} startDate - Start of valid range
 * @param {Date} endDate - End of valid range
 * @returns {boolean} True if date is within range
 */
export const isDateInRange = (date, startDate, endDate) => {
  const checkDate = new Date(date).getTime();
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  return checkDate >= start && checkDate <= end;
};

/**
 * Get an array of dates for the current week
 * @param {Date} date - Reference date
 * @returns {Date[]} Array of dates for the week
 */
export const getWeekDates = (date = new Date()) => {
  const sunday = new Date(date);
  sunday.setDate(date.getDate() - date.getDay());
  
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(sunday);
    day.setDate(sunday.getDate() + i);
    return day;
  });
};

/**
 * Format a date difference into a readable string
 * @param {Date} date - Date to compare
 * @param {Date} compareToDate - Date to compare against (defaults to now)
 * @returns {string} Readable time difference
 */
export const getRelativeTimeString = (date, compareToDate = new Date()) => {
  const diff = new Date(compareToDate).getTime() - new Date(date).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days === -1) return 'Tomorrow';
  if (days > 0) return `${days} days ago`;
  return `In ${Math.abs(days)} days`;
};

/**
 * Get the first day of the current month
 * @param {Date} date - Reference date
 * @returns {Date} First day of the month
 */
export const getFirstDayOfMonth = (date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Get the last day of the current month
 * @param {Date} date - Reference date
 * @returns {Date} Last day of the month
 */
export const getLastDayOfMonth = (date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Check if two dates are the same day
 * @param {Date} date1 - First date to compare
 * @param {Date} date2 - Second date to compare
 * @returns {boolean} True if dates are the same day
 */
export const isSameDay = (date1, date2) => {
  return new Date(date1).toDateString() === new Date(date2).toDateString();
};
