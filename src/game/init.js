import { Application, Graphics } from 'pixi.js';

import { useStateStore } from '@/stores/state.js';
import { useSettingStore } from '@/stores/setting.js';

let app = null;

const init = async (refValue) => {
  app = new Application();
  const settingStore = useSettingStore();
  await app.init({
    width: settingStore.rowNumber * settingStore.gridLength,
    height: settingStore.rowNumber * settingStore.gridLength,
    background: 0xcfcbc7
  });
  refValue.appendChild(app.canvas);
  drawGrid(settingStore);
};

const cells = [];

// 画出表格，以及初始状态
const drawGrid = () => {
  const stateStore = useStateStore();
  const settingStore = useSettingStore();
  for (let i = 0; i < settingStore.rowNumber; i++) {
    const row = [];
    cells.push(row);
    for (let j = 0; j < settingStore.rowNumber; j++) {
      let cell = new Graphics();

      let bgColor = (i + j) % 2 === 0 ? '#87B990' : '#7eb187';
      const onClick = (event) => {
        if (!stateStore.hasBegin) {
          changeCellState(event.target);
        }
      };

      cell.rect(0, 0, settingStore.gridLength, settingStore.gridLength);
      cell.fill(bgColor);

      cell.position.x = settingStore.gridLength * i;
      cell.position.y = settingStore.gridLength * j;
      // 添加事件反馈
      cell.interactive = true;
      cell.isLive = false;
      cell.beforeColor = '#1e5428';
      cell.on('pointerdown', onClick);
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
  const stateStore = useStateStore();
  clearCellsState();
  if (stateStore.hasBegin) {
    stateStore.changeGameState();
    stop();
  }
  switch (index) {
    case 1:
      changeCellState(cells[20][20]);
      break;

    default:
      break;
  }
};

export { init, clearCellsState, cells, changeCellState, reDrawGrid, setPresetShape };
