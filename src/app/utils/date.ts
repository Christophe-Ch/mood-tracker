export function dateToInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function dateTimeToDate(date: Date): Date {
  return new Date(date.setHours(0, 0, 0, 0));
}

export function addDaysToDate(date: Date, days: number): Date {
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + days);
  return nextDate;
}

export const TODAY = dateTimeToDate(new Date());
