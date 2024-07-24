import { gridLength } from './config.js';

let hasBegin = false;

const changeGameState = () => {
  hasBegin = !hasBegin;
};

const changeCellState = (cell) => {
  const beforeColor = cell.beforeColor;
  cell.beforeColor = cell.fillStyle.color;
  cell.isLive = !cell.isLive;
  //   cell.clear();
  cell.rect(0, 0, gridLength, gridLength);
  cell.fill(beforeColor);
};

export { changeGameState, hasBegin, changeCellState };
