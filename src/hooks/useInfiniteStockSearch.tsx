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
  isSearching: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult>;

  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
};

const debounceDelay = 1500;

export function useInfiniteStockSearch(): UseInfiniteStockSearchReturn {
  const [searchQuery, setSearchQuery] = useState('');

  const { debouncedValue: debouncedSearchQuery, isLoading: isSearching } =
    useDebounce(searchQuery, debounceDelay);

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
    isSearching,
    fetchNextPage,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    isLoading,
  };
}
