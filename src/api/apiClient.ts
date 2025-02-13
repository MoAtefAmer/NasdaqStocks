import axios from 'axios';
import 'react-native-url-polyfill/auto';
const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
const apiClient = axios.create({
  baseURL: 'https://api.polygon.io/v3/reference/',
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
});

export const fetchStocks = async ({
  query,
  pageCursor,
}: {
  query: string;
  pageCursor?: string;
}) => {
  try {
    const {data} = await apiClient.get('tickers', {
      params: {
        search: query,
        active: 'true',
        limit: 20,
        apiKey: POLYGON_API_KEY,
        sort: 'ticker',
        order: 'asc',
        cursor: pageCursor,
      },
    });
    return {
      stocks: data.results || [],
      nextCursor: data.next_url
        ? new URL(data.next_url).searchParams.get('cursor')
        : undefined, // Extract the next cursor
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
