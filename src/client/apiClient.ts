import axios from 'axios';

export const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
export const apiClient = axios.create({
  baseURL: 'https://api.polygon.io/v3/reference/',
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
});
