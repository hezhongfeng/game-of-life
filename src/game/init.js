import { Application, Graphics } from 'pixi.js';

import { useStateStore } from '@/stores/state.js';
import { useSettingStore } from '@/stores/setting.js';

let app = null;

const init = async (refValue) => {
  const settingStore = useSettingStore();
  app = new Application();
  await app.init({
    width: settingStore.rowNumber * settingStore.gridLength,
    height: settingStore.rowNumber * settingStore.gridLength
  });
  refValue.appendChild(app.canvas);
  drawGrid(settingStore);
};

const cells = [];

// 画出表格，以及初始状态
const drawGrid = () => {
  const stateStore = useStateStore();
  const settingStore = useSettingStore();
  // 小方格在没开始的时候可以点击切换状态
  const onClick = (event) => {
    if (!stateStore.hasBegin) {
      changeCellState(event.target);
    }
  };
  for (let i = 0; i < settingStore.rowNumber; i++) {
    const row = [];
    cells.push(row);
    for (let j = 0; j < settingStore.rowNumber; j++) {
      // 创建一个细胞
      const cell = new Graphics();

      // 底色使用两种颜色
      const bgColor = (i + j) % 2 === 0 ? '#87B990' : '#7eb187';
      // 画一个矩形，作为一个细胞
      cell.rect(0, 0, settingStore.gridLength, settingStore.gridLength);
      // 设置细胞的颜色
      cell.fill(bgColor);
      // 设置细胞的位置
      cell.position.x = settingStore.gridLength * i;
      cell.position.y = settingStore.gridLength * j;
      // 添加事件反馈，否则没有点击事件
      cell.interactive = true;
      // 细胞的状态
      cell.isLive = false;
      // 细胞上一个状态的颜色
      cell.beforeColor = '#1e5428';
      // 细胞的点击事件
      cell.on('pointerdown', onClick);
      // 将细胞添加进画布
      app.stage.addChild(cell);
      row.push(cell);
    }
  }
};

const clearGrid = () => {
  for (const row of cells) {
    for (const cell of row) {
      cell.destroy();
    }
  }
  cells.length = 0;
};

const reDrawGrid = () => {
  const settingStore = useSettingStore();
  app.renderer.resize(settingStore.rowNumber * settingStore.gridLength, settingStore.rowNumber * settingStore.gridLength);
  clearGrid();
  drawGrid();
};

const changeCellState = (cell) => {
  const settingStore = useSettingStore();
  const beforeColor = cell.beforeColor;
  cell.beforeColor = cell.fillStyle.color;
  cell.isLive = !cell.isLive;
  // 清除以前的绘制
  cell.clear();
  // 重新绘制矩形
  cell.rect(0, 0, settingStore.gridLength, settingStore.gridLength);
  cell.fill(beforeColor);
};

const clearCellsState = () => {
  const settingStore = useSettingStore();
  for (let i = 0; i < settingStore.rowNumber; i++) {
    for (let j = 0; j < settingStore.rowNumber; j++) {
      if (cells[i][j].isLive) {
        changeCellState(cells[i][j]);
      }
    }
  }
};

const setPresetShape = (index) => {
  clearCellsState();
  switch (index) {
    case '1-1':
      changeCellState(cells[19][20]);
      changeCellState(cells[20][20]);
      changeCellState(cells[18][21]);
      changeCellState(cells[21][21]);
      changeCellState(cells[19][22]);
      changeCellState(cells[20][22]);
      break;
    case '1-2':
      changeCellState(cells[19][20]);
      changeCellState(cells[18][21]);
      changeCellState(cells[20][21]);
      changeCellState(cells[19][22]);
      break;
    case '1-3':
      changeCellState(cells[19][20]);
      changeCellState(cells[20][20]);
      changeCellState(cells[19][21]);
      changeCellState(cells[21][21]);
      changeCellState(cells[20][22]);
      break;
    case '1-4':
      changeCellState(cells[19][20]);
      changeCellState(cells[20][20]);
      changeCellState(cells[18][21]);
      changeCellState(cells[21][21]);
      changeCellState(cells[19][22]);
      changeCellState(cells[21][22]);
      changeCellState(cells[20][23]);
      break;

    case '2-1':
      changeCellState(cells[18][20]);
      changeCellState(cells[19][20]);
      changeCellState(cells[20][20]);
      break;
    case '2-2':
      changeCellState(cells[18][18]);
      changeCellState(cells[19][18]);
      changeCellState(cells[18][19]);
      changeCellState(cells[19][19]);
      changeCellState(cells[20][20]);
      changeCellState(cells[21][20]);
      changeCellState(cells[20][21]);
      changeCellState(cells[21][21]);
      break;
    case '2-3':
      changeCellState(cells[18][19]);
      changeCellState(cells[19][19]);
      changeCellState(cells[20][19]);
      changeCellState(cells[19][20]);
      changeCellState(cells[20][20]);
      changeCellState(cells[21][20]);
      break;

    case '3-1':
      changeCellState(cells[19][20]);
      changeCellState(cells[17][21]);
      changeCellState(cells[19][21]);
      changeCellState(cells[18][22]);
      changeCellState(cells[19][22]);
      break;
    case '3-2':
      changeCellState(cells[17][20]);
      changeCellState(cells[18][20]);
      changeCellState(cells[19][20]);
      changeCellState(cells[20][20]);
      changeCellState(cells[16][21]);
      changeCellState(cells[20][21]);
      changeCellState(cells[20][22]);
      changeCellState(cells[16][23]);
      changeCellState(cells[19][23]);
      break;
    case '3-3':
      changeCellState(cells[17][20]);
      changeCellState(cells[18][20]);
      changeCellState(cells[19][20]);
      changeCellState(cells[20][20]);
      changeCellState(cells[21][20]);
      changeCellState(cells[16][21]);
      changeCellState(cells[21][21]);
      changeCellState(cells[21][22]);
      changeCellState(cells[16][23]);
      changeCellState(cells[20][23]);
      changeCellState(cells[18][24]);
      break;

    default:
      break;
  }
};

export { init, clearCellsState, cells, changeCellState, reDrawGrid, setPresetShape };
