import { AgGridReact } from 'ag-grid-react';
import { useState, useCallback } from 'react';
import fetchData from './utils/api';
import { TEST_ENVIRONMENT } from './utils/constants';
import { convertDate, firstLetterUppercase } from './utils/helpers';
import { Ticker, Column } from './utils/interfaces';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './App.css';

const App = () => {
  const [rowData, setRowData] = useState<Ticker[]>([]);
  const [columnDefs, setColumnDefs] = useState<Column[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTickers = useCallback(async () => {
    setLoading(true);
    const response = await fetchData();
    if (response) {
      setColumnDefs(
        Object.keys(response[0]).map((key) => ({
          headerName: firstLetterUppercase(
            key.replace(/([A-Z])/g, ' $1').trim()
          ),
          field: key,
          sortable: true,
        }))
      );
      setRowData(
        response.map((ticker) => {
          return {
            ...ticker,
            openTime: convertDate(ticker['openTime']),
            closeTime: convertDate(ticker['closeTime']),
          };
        })
      );
    }
    setLoading(false);
  }, []);

  return (
    <div className='ag-theme-alpine' style={{ width: '100%', height: 1050 }}>
      {loading && (
        <div className='overlay'>
          <div className='spinner'></div>
        </div>
      )}
      <AgGridReact
        onGridReady={fetchTickers}
        rowData={rowData}
        columnDefs={columnDefs}
        pagination
        suppressNoRowsOverlay
        suppressColumnVirtualisation={process.env.NODE_ENV === TEST_ENVIRONMENT}
      />
    </div>
  );
};

export default App;
