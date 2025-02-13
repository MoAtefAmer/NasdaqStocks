import {QueryClient} from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 min stale time
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
