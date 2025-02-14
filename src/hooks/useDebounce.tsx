import { useEffect, useState } from 'react';
import { debounceDelay } from '../constants';

export default function useDebounce(value: string) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return { debouncedValue };
}
