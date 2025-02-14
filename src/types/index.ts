export type Stock = {
  ticker: string;
  name: string;
  type: string;
  active: boolean;
  market: string;
  last_updated_utc: string;
  locale: string;
  share_class_figi: string;
  currency_name: string;
  composite_figi: string;
  primary_exchange: string;
};

export type FetchStocksResponse = {
  stocks: Stock[];
  nextCursor?: string;
};
