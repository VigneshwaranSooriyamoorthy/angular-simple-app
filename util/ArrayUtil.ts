export const getRandomValue = <T extends unknown>(arr: T[]): T => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

export const pickRandomItems = <T extends unknown>(arr: T[], n: number): T[] => {
  const shuffled = Array.from(arr).sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};
