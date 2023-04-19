const RowNumber = 40;

const gridLength = 20;

let cells = [];

let hasBegin = false;

const changeCellState = cell => {
  const beforeColor = cell.beforeColor;
  cell.beforeColor = cell.fill.color;
  cell.isLive = !cell.isLive;
  cell.clear();
  cell.beginFill(beforeColor);
  cell.drawRect(0, 0, gridLength, gridLength);
};

const changeGameState = () => {
  hasBegin = !hasBegin;
};

const clearCellsState = () => {
  for (let i = 0; i < RowNumber; i++) {
    for (let j = 0; j < RowNumber; j++) {
      if (cells[i][j].isLive) {
        changeCellState(cells[i][j]);
      }
    }
  }
};

export { cells, changeCellState, changeGameState, RowNumber, gridLength, hasBegin, clearCellsState };
