import axios from 'axios';

const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
const apiClient = axios.create({
  baseURL: 'https://api.polygon.io/v3/reference/',
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
});

export const fetchStocks = async (query: string) => {
  const {data} = await apiClient.get(`tickers`, {
    params: {
      search: query,
      active: true,
      limit: 100,
      apiKey: POLYGON_API_KEY,
    },
  });
  return data;
};
