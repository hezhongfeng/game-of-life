import { cells, RowNumber, changeCellState } from './common.js';
// (1)当前细胞为死亡状态时，当周围有3个存活细胞时，则迭代后该细胞变成存活状态(模拟繁殖)；若原先为生，则保持不变。
// (2)当前细胞为存活状态时，当周围的邻居细胞低于两个(不包含两个)存活时，该细胞变成死亡状态(模拟生命数量稀少)。
// (3)当前细胞为存活状态时，当周围有两个或3个存活细胞时，该细胞保持原样。
// (4)当前细胞为存活状态时，当周围有3个以上的存活细胞时，该细胞变成死亡状态(模拟生命数量过多)。

let timer = null;

// 当前细胞的状态矩阵
let cellsStateMatrix = [];
// 下一轮细胞的状态矩阵
let nextLoopCellsStateMatrix = [];

const run = () => {
  // 遍历每个细胞，以当前的状态计算下一轮的状态
  timer = setInterval(() => {
    getCellsStateMatrix();
    getNextLoopCellsStateMatrix();

    for (let i = 0; i < RowNumber; i++) {
      for (let j = 0; j < RowNumber; j++) {
        const currentCellState = cellsStateMatrix[i][j];
        const nextLiveCellsNumber = nextLoopCellsStateMatrix[i][j];
        // alive
        if (currentCellState) {
          if (nextLiveCellsNumber < 2 || nextLiveCellsNumber > 3) {
            changeCellState(cells[i][j]);
          }
        } else {
          if (nextLiveCellsNumber >= 3) {
            changeCellState(cells[i][j]);
          }
        }
      }
    }
  }, 1000);
};
// 获取紧挨着的活着的细胞数
const getNextLiveCellsNumber = (row, colunm) => {
  let count = 0;
  for (let i = row - 1; i <= row + 1; i++) {
    if (i < 0 || i >= RowNumber) {
      continue;
    }
    for (let j = colunm - 1; j <= colunm + 1; j++) {
      if (j < 0 || j >= RowNumber) {
        continue;
      }
      if (i === row && j === colunm) {
        continue;
      }
      if (cellsStateMatrix[i][j]) {
        count++;
      }
    }
  }
  return count;
};

const getCellsStateMatrix = () => {
  cellsStateMatrix = [];
  for (let i = 0; i < RowNumber; i++) {
    const row = [];
    cellsStateMatrix.push(row);
    for (let j = 0; j < RowNumber; j++) {
      const cell = cells[i][j];
      if (cell.isLive) {
        row.push(true);
      } else {
        row.push(false);
      }
    }
  }
};

const getNextLoopCellsStateMatrix = () => {
  nextLoopCellsStateMatrix = [];
  for (let i = 0; i < RowNumber; i++) {
    const row = [];
    nextLoopCellsStateMatrix.push(row);
    for (let j = 0; j < RowNumber; j++) {
      const nextLiveCellsNumber = getNextLiveCellsNumber(i, j);
      row.push(nextLiveCellsNumber);
    }
  }
};

const stop = () => {
  clearInterval(timer);
};
export { run, stop };
