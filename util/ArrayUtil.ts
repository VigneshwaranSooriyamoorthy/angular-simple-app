export const getRandomValue = <T extends unknown>(arr: T[]): T => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

export const pickRandomItems = <T extends unknown>(arr: T[], n: number): T[] => {
  const shuffled = Array.from(arr).sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

export const getNaturalNumbers = (count: number): number[] => {
  return Array.from({ length: count }, (_, i) => i + 1);
};

export const getSumOfArrayItems = (array: number[]) => {
  return array.reduce((acc, num) => acc + num, 0);
};

export const getAverageOfArrayItems = (array: number[], toFixed = 2) => {
  console.log(array);
  return Number((getSumOfArrayItems(array) / array.length).toFixed(toFixed));
};
