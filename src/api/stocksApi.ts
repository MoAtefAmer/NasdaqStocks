import axios from 'axios';
import {apiClient, POLYGON_API_KEY} from '../client/apiClient';
import 'react-native-url-polyfill/auto';
export const fetchStocks = async ({
  query,
  pageCursor,
}: {
  query: string;
  pageCursor?: string;
}) => {
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
    const {data} = await apiClient.get('tickers', {
      params,
    });

    const nextCursor =
      new URL(data.next_url || '').searchParams.get('cursor') ?? undefined;

    const stocks = data?.results || [];

    return {
      stocks,
      nextCursor,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        console.warn('Rate limited! Retrying...');
        throw new Error('rate_limit');
      }
      console.error('API Error:', error.response?.data);
    }

    throw error;
  }
};
