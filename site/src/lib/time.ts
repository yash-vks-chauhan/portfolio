// Local time for the hero's live chip ("Open to 2027 roles · Chennai 9:04 PM").

export function formatLocalTime(date: Date, timeZone = 'Asia/Kolkata'): string {
  return new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: '2-digit' }).format(date);
}

/** Milliseconds until the next minute starts, so a clock can tick exactly on the minute. */
export function msToNextMinute(now: Date = new Date()): number {
  return 60_000 - (now.getSeconds() * 1000 + now.getMilliseconds());
}
