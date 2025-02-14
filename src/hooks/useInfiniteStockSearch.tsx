import { useState, useMemo } from 'react';
import useDebounce from './useDebounce';
import { useInfiniteStocks } from './useInfiniteStocks';
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { Stock } from '../types/stocks';

type UseInfiniteStockSearchReturn = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  stocks: Stock[];
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult>;

  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
};

export function useInfiniteStockSearch(): UseInfiniteStockSearchReturn {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { debouncedValue: debouncedSearchQuery } = useDebounce(searchQuery);

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteStocks(debouncedSearchQuery);

  const stocks = useMemo(
    () => data?.pages.flatMap(page => page.stocks) || [],
    [data],
  );

  return {
    searchQuery,
    setSearchQuery,
    stocks,
    fetchNextPage,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    isLoading,
  };
}
