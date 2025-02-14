import { useInfiniteQuery } from '@tanstack/react-query';
import { FetchStocksResponse } from '../types/stocks';
import { fetchStocks } from '../api/stocksApi';

export const useInfiniteStocks = (query: string) => {
  return useInfiniteQuery<FetchStocksResponse, Error>({
    queryKey: ['stocks', query],
    queryFn: ({ pageParam = undefined }) =>
      fetchStocks({ query, pageCursor: pageParam as string | undefined }),
    initialPageParam: undefined,
    getNextPageParam: lastPage => lastPage?.nextCursor ?? undefined,
    staleTime: 60000,
    retry: (failureCount, error) =>
      error?.message === 'rate_limit' && failureCount < 3, // Retry only for rate limit errors
    retryDelay: attempt => Math.min(5000 * 2 ** attempt, 30000), // 5,10,20, capped at 30
  });
};
