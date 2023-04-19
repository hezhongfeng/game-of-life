import { Application, Graphics } from 'pixi.js';
import start from './controller.js';
import { cells, RowNumber, gridLength, changeCellState, hasBegin } from './common.js';

const init = refValue => {
  let app = new Application({
    width: RowNumber * gridLength + 100,
    height: RowNumber * gridLength,
    background: 0xcfcbc7
  });
  refValue.appendChild(app.view);
  drawGrid(app);
  start(app);
};

// 画出表格，以及初始状态
const drawGrid = app => {
  for (let i = 0; i < RowNumber; i++) {
    const row = [];
    cells.push(row);
    for (let j = 0; j < RowNumber; j++) {
      let cell = new Graphics();
      let bgColor = (i + j) % 2 === 0 ? '#87B990' : '#7eb187';
      const onClick = event => {
        if (!hasBegin) {
          changeCellState(event.target);
        }
      };
      cell.beginFill(bgColor);
      cell.drawRect(0, 0, gridLength, gridLength);
      cell.position.x = gridLength * i;
      cell.position.y = gridLength * j;
      cell.interactive = true;
      cell.isLive = false;
      cell.beforeColor = '#1e5428';
      cell.on('pointerdown', onClick);
      app.stage.addChild(cell);
      row.push(cell);
    }
  }
};

export { init, drawGrid };
