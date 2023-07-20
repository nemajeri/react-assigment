import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BINANCE_API_URL } from './utils/constants';
import {
  getNamedCellsWithValues,
  getRowCellNamed,
  getCellValue,
  waitForGridToBeInTheDOM,
  waitForDataToHaveLoaded,
} from './utils/AgGridTestUtils';

describe('App component', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);

    const mockData = [
      {
        symbol: 'ETHBTC',
        priceChange: '-0.00027000',
        priceChangePercent: '-0.425',
        weightedAvgPrice: '0.06339785',
        prevClosePrice: '0.06360000',
        lastPrice: '0.06333000',
        lastQty: '0.07640000',
        bidPrice: '0.06332000',
        bidQty: '44.73360000',
        askPrice: '0.06333000',
        askQty: '22.23630000',
        openPrice: '0.06360000',
        highPrice: '0.06379000',
        lowPrice: '0.06303000',
        volume: '11877.51520000',
        quoteVolume: '753.00897782',
        openTime: 1689752320764,
        closeTime: 1689838720764,
        firstId: 421199769,
        lastId: 421230610,
        count: 30842,
      },
      {
        symbol: 'LTCBTC',
        priceChange: '-0.00001700',
        priceChangePercent: '-0.547',
        weightedAvgPrice: '0.00308856',
        prevClosePrice: '0.00310800',
        lastPrice: '0.00309200',
        lastQty: '0.25000000',
        bidPrice: '0.00309200',
        bidQty: '4.53700000',
        askPrice: '0.00309300',
        askQty: '38.32500000',
        openPrice: '0.00310900',
        highPrice: '0.00310900',
        lowPrice: '0.00306700',
        volume: '60677.89900000',
        quoteVolume: '187.40750754',
        openTime: 1689752325373,
        closeTime: 1689838725373,
        firstId: 92666667,
        lastId: 92682104,
        count: 15438,
      },
      {
        symbol: 'BNBBTC',
        priceChange: '-0.00001800',
        priceChangePercent: '-0.223',
        weightedAvgPrice: '0.00806256',
        prevClosePrice: '0.00808400',
        lastPrice: '0.00806600',
        lastQty: '0.02000000',
        bidPrice: '0.00806500',
        bidQty: '8.77600000',
        askPrice: '0.00806600',
        askQty: '4.83500000',
        openPrice: '0.00808400',
        highPrice: '0.00808900',
        lowPrice: '0.00802200',
        volume: '21781.03400000',
        quoteVolume: '175.61083447',
        openTime: 1689752323619,
        closeTime: 1689838723619,
        firstId: 225272773,
        lastId: 225300136,
        count: 27364,
      },
    ];

    mock.onGet(BINANCE_API_URL).reply(200, mockData);
  });

  afterEach(() => {
    mock.restore();
  });

  test('fetches and renders tickers', async () => {
    render(<App />);

    await waitForGridToBeInTheDOM();
    await waitForDataToHaveLoaded();

    const expectedCellValue = 'LTCBTC';

    const cells = getNamedCellsWithValues(1, expectedCellValue);
    expect(cells.length).toBeGreaterThan(0);

    const cell = getRowCellNamed(1, 1);
    expect(getCellValue(cell)).toEqual(expectedCellValue);
  });
});
