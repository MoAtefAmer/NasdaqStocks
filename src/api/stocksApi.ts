import axios from 'axios';
import { httpClient, POLYGON_API_KEY } from '../client/httpClient';
import 'react-native-url-polyfill/auto';
import { Stock, FetchStocksResponse } from '../types';
export const fetchStocks = async ({
  query,
  pageCursor,
}: {
  query?: string;
  pageCursor?: string;
}): Promise<FetchStocksResponse> => {
  const params = {
    search: query,
    active: true,
    limit: 20,
    apiKey: POLYGON_API_KEY,
    sort: 'ticker',
    order: 'asc',
    cursor: pageCursor,
  };

  try {
    const { data } = await httpClient.get<{
      results?: Stock[];
      next_url?: string;
    }>('tickers', { params });
    const nextCursor =
      (data?.next_url
        ? new URL(data?.next_url).searchParams.get('cursor')
        : undefined) ?? undefined;

    const stocks: Stock[] = data?.results || [];

    return {
      stocks,
      nextCursor,
    };
  } catch (error) {
    console.error('Tickers Fetch Api error :>> ', error);
    if (!axios.isAxiosError(error)) {
      throw error;
    }

    const status = error.response?.status;
    const message = error.response?.data || 'Unknown API Error';

    if (status === 429) {
      console.warn('Rate limited! Retrying...');
      throw new Error('rate_limit');
    }

    console.error('API Error:', message);
    throw error;
  }
};
