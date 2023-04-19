const RowNumber = 20;

const gridLength = 30;

const cells = [];

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

export { cells, changeCellState, changeGameState, RowNumber, gridLength, hasBegin };
