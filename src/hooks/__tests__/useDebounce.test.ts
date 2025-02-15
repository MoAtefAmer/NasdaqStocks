import { renderHook, act } from '@testing-library/react-native';
import useDebounce from '../useDebounce'; // Adjust path if needed
import { debounceDelay } from '../../constants/index';

jest.useFakeTimers();

describe('useDebounce Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial'));
    expect(result.current.debouncedValue).toBe('initial');
  });

  it('should update the debounced value after debounceDelay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'first' },
    });

    expect(result.current.debouncedValue).toBe('first');

    rerender({ value: 'second' });

    // Value should not change immediately
    expect(result.current.debouncedValue).toBe('first');

    // Fast-forward the debounce delay
    act(() => {
      jest.advanceTimersByTime(debounceDelay);
    });

    // Now, debounced value should be updated
    expect(result.current.debouncedValue).toBe('second');
  });

  it('should clear timeout on unmount', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    const { unmount, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      {
        initialProps: { value: 'test' },
      },
    );

    rerender({ value: 'new value' });

    // Unmount before debounce delay passes
    unmount();

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(debounceDelay);
    });

    // Ensure clearTimeout is called to clean up the timeout
    expect(setTimeoutSpy).toHaveBeenCalled();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
