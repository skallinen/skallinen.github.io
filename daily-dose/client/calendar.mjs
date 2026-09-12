import { addDays, localDate, validateSchedule } from '../server/domain.mjs';

export function midnight(date, timezone) {
  const wanted = Date.parse(`${date}T00:00:00Z`);
  let guess = wanted;
  const format = new Intl.DateTimeFormat('en-GB', { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' });
  for (let i = 0; i < 5; i++) {
    const p = Object.fromEntries(format.formatToParts(guess).map(p => [p.type, p.value]));
    const represented = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
    if (represented === wanted) return guess;
    guess += wanted - represented;
  }
  throw new Error('That timezone has an ambiguous midnight on this date. Choose another start date.');
}
export function scheduleDates(startDate, timezone, now = Date.now()) {
  validateSchedule(startDate, timezone, now);
  return Array.from({ length: 51 }, (_, i) => midnight(addDays(startDate, i), timezone));
}
export { addDays, localDate };
