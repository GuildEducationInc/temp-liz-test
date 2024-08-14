export const debounce = (fn: (...args: unknown[]) => unknown, delay: number) => {
  let timeoutID: NodeJS.Timeout;

  return (...args: unknown[]) => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
