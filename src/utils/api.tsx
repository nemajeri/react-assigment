import axios from 'axios';
import {
  BINANCE_API_URL,
  FETCH_FAILURE_MESSAGE,
  TEST_ENVIRONMENT,
} from './constants';
import { Ticker } from './interfaces';

const fetchData = async (): Promise<Ticker[] | undefined> => {
  try {
    const response = await axios.get<Ticker[]>(BINANCE_API_URL);
    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === TEST_ENVIRONMENT) {
      console.error(`${FETCH_FAILURE_MESSAGE}:`, error);
    }
    throw error;
  }
};

export default fetchData;
