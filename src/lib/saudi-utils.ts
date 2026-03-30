/**
 * Saudi Arabia specific utilities for the restaurant app
 */

// Arabic numerals mapping
const ARABIC_NUMERALS: Record<string, string> = {
  '0': '٠',
  '1': '١', 
  '2': '٢',
  '3': '٣',
  '4': '٤',
  '5': '٥',
  '6': '٦',
  '7': '٧',
  '8': '٨',
  '9': '٩'
};

/**
 * Converts Western numerals to Arabic numerals
 */
export function toArabicNumerals(num: string | number): string {
  const str = num.toString();
  return str.replace(/[0-9]/g, (digit) => ARABIC_NUMERALS[digit] || digit);
}

/**
 * Formats price with Arabic numerals and Saudi Riyal symbol
 */
export function formatPrice(price: number): string {
  // Format to 2 decimal places
  const formattedPrice = price.toFixed(2);
  // Convert to Arabic numerals
  const arabicPrice = toArabicNumerals(formattedPrice);
  return `${arabicPrice} ر.س`;
}

/**
 * Calculates VAT (15% for Saudi Arabia)
 */
export function calculateVAT(amount: number): number {
  const VAT_RATE = 0.15; // 15% VAT for Saudi Arabia
  return Math.round(amount * VAT_RATE * 100) / 100; // Round to 2 decimal places
}

/**
 * Validates Saudi phone number
 * Accepts formats: +966501234567, 966501234567, 0501234567, 05xxxxxxxx
 */
export function validateSaudiPhone(phone: string): boolean {
  // Remove spaces, dashes, and parentheses
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  // Saudi phone patterns
  const patterns = [
    /^\+9665[0-9]{8}$/, // +9665xxxxxxxx
    /^9665[0-9]{8}$/,   // 9665xxxxxxxx
    /^05[0-9]{8}$/,     // 05xxxxxxxx
    /^5[0-9]{8}$/       // 5xxxxxxxx (without leading 0)
  ];
  
  return patterns.some(pattern => pattern.test(cleanPhone));
}

/**
 * Formats phone number for display
 */
export function formatSaudiPhone(phone: string): string {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  if (cleanPhone.startsWith('+966')) {
    return cleanPhone;
  } else if (cleanPhone.startsWith('966')) {
    return `+${cleanPhone}`;
  } else if (cleanPhone.startsWith('05')) {
    return `+966${cleanPhone.substring(1)}`;
  } else if (cleanPhone.startsWith('5') && cleanPhone.length === 9) {
    return `+966${cleanPhone}`;
  }
  
  return phone; // Return original if no pattern matches
}

/**
 * Validates Saudi ID (optional for future use)
 */
export function validateSaudiID(id: string): boolean {
  // Saudi ID is 10 digits, starts with 1 or 2 for Saudis
  const pattern = /^[12][0-9]{9}$/;
  return pattern.test(id);
}

/**
 * Get current time in Saudi Arabia timezone (AST - UTC+3)
 */
export function getSaudiTime(): Date {
  const now = new Date();
  // Saudi Arabia is always UTC+3, no daylight saving
  const saudiTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3 * 3600000));
  return saudiTime;
}

/**
 * Check if current time is during weekend (Friday/Saturday in Saudi Arabia)
 */
export function isSaudiWeekend(): boolean {
  const saudiTime = getSaudiTime();
  const day = saudiTime.getDay();
  // Friday = 5, Saturday = 6 in JavaScript
  return day === 5 || day === 6;
}

/**
 * Format time in Saudi format
 */
export function formatSaudiTime(): string {
  const saudiTime = getSaudiTime();
  const hours = saudiTime.getHours().toString().padStart(2, '0');
  const minutes = saudiTime.getMinutes().toString().padStart(2, '0');
  return `${toArabicNumerals(hours)}:${toArabicNumerals(minutes)}`;
}
