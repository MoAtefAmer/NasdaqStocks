import {useState, useMemo} from 'react';
import useDebounce from './useDebounce';
import {useInfiniteStocks} from './useInfiniteStocks';

export function useInfiniteStockSearch(debounceDelay = 1500) {
  const [query, setQuery] = useState('');
  const {debouncedValue: debouncedSearchQuery, isLoading: isSearching} =
    useDebounce(query, debounceDelay);

  const {data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading} =
    useInfiniteStocks(debouncedSearchQuery);

  const stocks = useMemo(
    () => data?.pages.flatMap(page => page.stocks) || [],
    [data],
  );

  return {
    query,
    setQuery,
    stocks,
    isSearching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
}
