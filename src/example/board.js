import { Application, Graphics } from 'pixi.js';
import start from './controller.js';
import { cells, RowNumber, gridLength, changeCellState, hasBegin } from './common.js';

export default refValue => {
  let app = new Application({ width: RowNumber * gridLength + 100, height: RowNumber * gridLength });
  refValue.appendChild(app.view);

  // 画出表格
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
      cell.beforeColor = '#BBDBBF';
      cell.on('pointerdown', onClick);
      app.stage.addChild(cell);
      row.push(cell);
    }
  }
  start(app);
};
