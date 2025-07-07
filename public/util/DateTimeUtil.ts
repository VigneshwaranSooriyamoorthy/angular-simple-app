export const MONTHS: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};
