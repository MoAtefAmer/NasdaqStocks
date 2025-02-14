import axios from 'axios';
import {apiClient, POLYGON_API_KEY} from '../client/apiClient';
import 'react-native-url-polyfill/auto';
import {Stock, FetchStocksResponse} from '../types/stocks';

export const fetchStocks = async ({
  query,
  pageCursor,
}: {
  query?: string;
  pageCursor?: string;
}): Promise<FetchStocksResponse> => {
  const params = {
    search: query,
    active: 'true',
    limit: 20,
    apiKey: POLYGON_API_KEY,
    sort: 'ticker',
    order: 'asc',
    cursor: pageCursor,
  };

  try {
    const {data} = await apiClient.get<{results?: Stock[]; next_url?: string}>(
      'tickers',
      {params},
    );

    const nextCursor =
      new URL(data.next_url || '').searchParams.get('cursor') ?? undefined;

    const stocks: Stock[] = data?.results || [];
    console.log('fetching...', stocks);

    return {
      stocks,
      nextCursor,
    };
  } catch (error) {
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
