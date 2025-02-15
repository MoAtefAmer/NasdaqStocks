import axios from 'axios';
import { fetchStocks } from '../../api/stocksApi';
import { httpClient, POLYGON_API_KEY } from '../../client/httpClient';
import { FetchStocksResponse } from '../../types/index';

jest.mock('../../client/httpClient', () => ({
  httpClient: {
    get: jest.fn(),
  },
}));

describe('fetchStocks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch stocks successfully', async () => {
    const mockResponse = {
      results: [{ id: '1', ticker: 'AAPL', name: 'Apple Inc.', price: 150 }],
      next_url: 'https://api.polygon.io/tickers?cursor=next-page',
    };

    (httpClient.get as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result: FetchStocksResponse = await fetchStocks({ query: 'AAPL' });

    expect(httpClient.get).toHaveBeenCalledWith('tickers', {
      params: {
        search: 'AAPL',
        active: true,
        limit: 20,
        apiKey: POLYGON_API_KEY,
        sort: 'ticker',
        order: 'asc',
        cursor: undefined,
      },
    });

    expect(result).toEqual({
      stocks: mockResponse.results,
      nextCursor: 'next-page',
    });
  });

  it('should handle pagination correctly', async () => {
    const mockResponse = {
      results: [
        { id: '2', ticker: 'GOOGL', name: 'Alphabet Inc.', price: 2800 },
      ],
      next_url: 'https://api.polygon.io/tickers?cursor=next-page-token',
    };

    (httpClient.get as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result: FetchStocksResponse = await fetchStocks({
      query: 'GOOGL',
      pageCursor: 'page-123',
    });

    expect(httpClient.get).toHaveBeenCalledWith('tickers', {
      params: {
        search: 'GOOGL',
        active: true,
        limit: 20,
        apiKey: POLYGON_API_KEY,
        sort: 'ticker',
        order: 'asc',
        cursor: 'page-123',
      },
    });

    expect(result).toEqual({
      stocks: mockResponse.results,
      nextCursor: 'next-page-token',
    });
  });

  it('should return an empty stocks array if no results are found', async () => {
    const mockResponse = { results: [], next_url: null };

    (httpClient.get as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result: FetchStocksResponse = await fetchStocks({ query: 'UNKNOWN' });

    expect(result).toEqual({
      stocks: [],
      nextCursor: undefined,
    });
  });

  it('should handle rate limiting errors (429)', async () => {
    const rateLimitError = new axios.AxiosError(
      'Request failed with status code 429',
      'ERR_BAD_RESPONSE',
      undefined,
      undefined,
      {
        status: 429, // Rate limiting status code
        data: { message: 'Too many requests' },
        headers: {},
        config: {},
      },
    );
    (httpClient.get as jest.Mock).mockRejectedValue(rateLimitError);

    await expect(fetchStocks({ query: 'AAPL' })).rejects.toThrow('rate_limit');

    expect(httpClient.get).toHaveBeenCalled();
  });

  it('should throw an API error with status and message', async () => {
    const apiError = new axios.AxiosError(
      'Request failed with status code 500',
      'ERR_BAD_RESPONSE',
      undefined,
      undefined,
      {
        status: 500,
        data: { message: 'Internal Server Error' },
        headers: {},
        config: {},
      },
    );
    (httpClient.get as jest.Mock).mockRejectedValue(apiError);

    await expect(fetchStocks({ query: 'AAPL' })).rejects.toThrow(apiError);
  });

  it('should throw an unknown error if not an axios error', async () => {
    const unknownError = new Error('Something went wrong');

    (httpClient.get as jest.Mock).mockRejectedValue(unknownError);

    await expect(fetchStocks({ query: 'AAPL' })).rejects.toThrow(unknownError);
  });
});
