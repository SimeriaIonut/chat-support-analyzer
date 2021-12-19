export const shouldSkipAPICall = (array: string[]) => {
  if (array.length === 0) return true;


  if (array.length <= 5) {
    // Call the API every 2nd message if at the start of chat
    return array.length % 2 !== 0;
  } else {
    // Call the API every 5th message to save on API resources
    return array.length % 5 !== 0;
  }
}

export const getProgressBarPercentage = (value: number) => {
  if (value === 0) return 50;
  const min = -1.0;
  const max = 1.0;
  return Math.ceil(((value - min) / (max - min)) * 100);
};

export const mergeArraysAlternatively = (arr1: string[], arr2: string[]) =>
  (arr1.length > arr2.length ? arr1 : arr2)
    .map((_, i) => [arr1[i], arr2[i]])
    .flat()
    .filter(Boolean);
