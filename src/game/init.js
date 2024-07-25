import { Application, Graphics } from 'pixi.js';

import { RowNumber, gridLength } from './config.js';
import { useStateStore } from '@/stores/state.js';

const init = async (refValue) => {
  let app = new Application();
  await app.init({
    width: RowNumber * gridLength,
    height: RowNumber * gridLength,
    background: 0xcfcbc7
  });
  refValue.appendChild(app.canvas);
  drawGrid(app);
};

// 画出表格，以及初始状态
const drawGrid = (app) => {
  const stateStore = useStateStore();
  for (let i = 0; i < RowNumber; i++) {
    // const row = [];
    // cells.push(row)
    for (let j = 0; j < RowNumber; j++) {
      let cell = new Graphics();

      let bgColor = (i + j) % 2 === 0 ? '#87B990' : '#7eb187';
      const onClick = (event) => {
        if (!stateStore.hasBegin) {
          changeCellState(event.target);
        }
      };

      cell.rect(0, 0, gridLength, gridLength);
      cell.fill(bgColor);

      cell.position.x = gridLength * i;
      cell.position.y = gridLength * j;
      // 添加事件反馈
      cell.interactive = true;
      cell.isLive = false;
      cell.beforeColor = '#1e5428';
      cell.on('pointerdown', onClick);
      app.stage.addChild(cell);
      // row.push(cell);
    }
  }

  // let obj = new Graphics();
  // obj.rect(0, 0, 200, 100);
  // obj.fill(0xff0000);

  // Add it to the stage to render
  // app.stage.addChild(obj);
};

const changeCellState = (cell) => {
  const beforeColor = cell.beforeColor;
  cell.beforeColor = cell.fillStyle.color;
  cell.isLive = !cell.isLive;
  // 清除以前的绘制
  cell.clear();
  // 重新绘制矩形
  cell.rect(0, 0, gridLength, gridLength);
  cell.fill(beforeColor);
};

export { init };
