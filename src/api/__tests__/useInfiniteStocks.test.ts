import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useInfiniteStocks } from '../useInfiniteStocks';
import { fetchStocks } from '../stocksApi';
import { FetchStocksResponse } from '../../types';
import React from 'react';

jest.mock('../stocksApi', () => ({
  fetchStocks: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries for testing
      },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children,
    );
  };
};

describe('useInfiniteStocks Hook', () => {
  it('should fetch stocks successfully', async () => {
    const mockResponse: FetchStocksResponse = {
      stocks: [{ id: '1', name: 'AAPL', price: 150 }],
      nextCursor: 'next-page',
    };

    (fetchStocks as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useInfiniteStocks('AAPL'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.data).toBeDefined());

    expect(result.current.data?.pages[0].stocks).toHaveLength(1);
    expect(result.current.data?.pages[0].stocks[0].name).toBe('AAPL');
  });

  it('should return an error on fetch failure', async () => {
    (fetchStocks as jest.Mock).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useInfiniteStocks('AAPL'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
    expect(result.current.error?.message).toBe('Network error');
  });

  it('should fetch next page correctly', async () => {
    const firstPage: FetchStocksResponse = {
      stocks: [{ id: '1', name: 'AAPL', price: 150 }],
      nextCursor: 'next-page',
    };
    const secondPage: FetchStocksResponse = {
      stocks: [{ id: '2', name: 'GOOGL', price: 2800 }],
      nextCursor: null,
    };

    (fetchStocks as jest.Mock)
      .mockResolvedValueOnce(firstPage)
      .mockResolvedValueOnce(secondPage);

    const { result } = renderHook(() => useInfiniteStocks('AAPL'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.data).toBeDefined());

    await result.current.fetchNextPage();

    await waitFor(() => expect(result.current.data?.pages.length).toBe(2));

    expect(result.current.data?.pages[1].stocks[0].name).toBe('GOOGL');
  });
});
