export interface Ticker {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: string;
  closeTime: string;
  firstId: number;
  lastId: number;
  count: number;
}

export interface Column {
    headerName: string;
    field: string;
    sortable: boolean;
}
