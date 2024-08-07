import { cells, changeCellState } from './init.js';
import { useSettingStore } from '@/stores/setting.js';

// (1)当前细胞为死亡状态时，当周围有3个存活细胞时，则迭代后该细胞变成存活状态(模拟繁殖)；
// (2)当前细胞为存活状态时，当周围的邻居细胞低于两个(不包含两个)存活时，该细胞变成死亡状态(模拟生命数量稀少)。
// (3)当前细胞为存活状态时，当周围有两个或3个存活细胞时，该细胞保持原样。
// (4)当前细胞为存活状态时，当周围有3个以上的存活细胞时，该细胞变成死亡状态(模拟生命数量过多)。

let timer = null;

// 当前细胞的状态矩阵
let cellsStateMatrix = [];
// 当前细胞的周围存活细胞数矩阵
let nextLiveCellsNumberMatrix = [];

const run = () => {
  const settingStore = useSettingStore();
  // 遍历细胞，以当前的状态计算下一周期的状态
  timer = setInterval(() => {
    // 获取当前细胞的状态矩阵
    getCellsStateMatrix();
    // 获取当前细胞周围存活细胞数的矩阵
    getNextLiveCellsNumberMatrix();
    // 根据规则，获取下一个周期的细胞状态，并修改细胞状态
    getNextCycleCellsState();
  }, settingStore.cycle);
};
// 获取紧挨着的活着的细胞数
const getNextLiveCellsNumber = (row, colunm) => {
  const settingStore = useSettingStore();
  let count = 0;
  for (let i = row - 1; i <= row + 1; i++) {
    if (i < 0 || i >= settingStore.rowNumber) {
      continue;
    }
    for (let j = colunm - 1; j <= colunm + 1; j++) {
      if (j < 0 || j >= settingStore.rowNumber) {
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

// 获取当前细胞的状态矩阵
const getCellsStateMatrix = () => {
  const settingStore = useSettingStore();
  cellsStateMatrix = [];
  for (let i = 0; i < settingStore.rowNumber; i++) {
    const row = [];
    cellsStateMatrix.push(row);
    for (let j = 0; j < settingStore.rowNumber; j++) {
      const cell = cells[i][j];
      if (cell.isLive) {
        row.push(true);
      } else {
        row.push(false);
      }
    }
  }
};

// 获取当前细胞周围存活细胞数的矩阵
const getNextLiveCellsNumberMatrix = () => {
  const settingStore = useSettingStore();
  nextLiveCellsNumberMatrix = [];
  for (let i = 0; i < settingStore.rowNumber; i++) {
    const row = [];
    nextLiveCellsNumberMatrix.push(row);
    for (let j = 0; j < settingStore.rowNumber; j++) {
      const nextLiveCellsNumber = getNextLiveCellsNumber(i, j);
      row.push(nextLiveCellsNumber);
    }
  }
};

// 根据规则，获取下一个周期的细胞状态，并修改细胞状态
const getNextCycleCellsState = () => {
  const settingStore = useSettingStore();
  for (let i = 0; i < settingStore.rowNumber; i++) {
    for (let j = 0; j < settingStore.rowNumber; j++) {
      // 当前细胞状态
      const currentCellState = cellsStateMatrix[i][j];
      // 当前细胞周围存活细胞数
      const nextLiveCellsNumber = nextLiveCellsNumberMatrix[i][j];
      // alive
      if (currentCellState) {
        if (nextLiveCellsNumber < 2 || nextLiveCellsNumber > 3) {
          changeCellState(cells[i][j]);
        }
      } else {
        if (nextLiveCellsNumber == 3) {
          changeCellState(cells[i][j]);
        }
      }
    }
  }
};

const stop = () => {
  clearInterval(timer);
};
export { run, stop };
