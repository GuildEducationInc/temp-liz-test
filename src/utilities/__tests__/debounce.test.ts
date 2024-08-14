import { debounce } from '../functions';

jest.useFakeTimers();

describe('debounce', () => {
  it('should call the callback once the timer has run', () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(func).toHaveBeenCalled();
  });

  it('should only call the callback once', () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 1000);

    for (let i = 0; i < 100; i++) {
      debouncedFunc();
    }

    jest.runAllTimers();

    expect(func).toHaveBeenCalledTimes(1);
  });
});
