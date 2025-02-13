import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchStocks} from '../api/apiClient';

export const useStocks = (query: string) => {
  return useInfiniteQuery({
    queryKey: ['fetchStocks', query],
    queryFn: async ({pageParam}) =>
      await fetchStocks({query, pageCursor: pageParam}),
    initialPageParam: '',
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    staleTime: 60000,
    retry: (_, error) => {
      if (error?.message === 'rate_limit') {
        return true;
      }
      return false;
    },
    retryDelay: attempt => Math.min(5000 * 2 ** attempt, 30000), // 5,10,20, capped at 30 seconds
  });
};
