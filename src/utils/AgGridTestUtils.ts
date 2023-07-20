import { waitFor } from '@testing-library/react';

const waitForGridToBeInTheDOM = (): Promise<void> => {
  return waitFor(() => {
    expect(document.querySelector('.ag-root-wrapper')).toBeInTheDocument();
  });
};

const waitForDataToHaveLoaded = (): Promise<void> => {
  return waitFor(() => {
    expect(document.querySelector('.ag-overlay-no-rows-center')).toBeNull();
  });
};

const columnNamed = (cellName: string) : string => {
  return `.ag-header-cell[col-id="${cellName}"]`;
};

const getRowCellNamed = (rowId: number, colIndex: number): Element | null => {
    return document.querySelector(`.ag-row[row-id="${rowId}"] .ag-cell[aria-colindex="${colIndex}"]`);
  };

  const getCellValue = (cell: Element | null): string | undefined | null => {
    return cell?.textContent;
  };

  const getNamedCellsWithValues = (colIndex: number, cellValue: string) : Element[] => {
    const cells = Array.from(document.querySelectorAll(`.ag-cell[aria-colindex="${colIndex}"]`));
  
    return cells.filter((cell) => getCellValue(cell) == cellValue);
  };

export {
  waitForGridToBeInTheDOM,
  waitForDataToHaveLoaded,
  columnNamed,
  getNamedCellsWithValues,
  getCellValue,
  getRowCellNamed,
};
