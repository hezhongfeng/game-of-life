import { Application, Graphics } from 'pixi.js';

// const hasBegin = false;

export default refValue => {
  const RowNumber = 70;

  const gridLength = 10;

  let app = new Application({ width: RowNumber * gridLength, height: RowNumber * gridLength });
  refValue.appendChild(app.view);

  const changeState = event => {
    const square = event.target;
    const beforeColor = square.beforeColor;
    square.beforeColor = square.fill.color;
    square.isLive = !square.isLive;
    square.clear();
    square.beginFill(beforeColor);
    square.drawRect(0, 0, gridLength, gridLength);
  };

  for (let i = 0; i < RowNumber; i++) {
    for (let j = 0; j < RowNumber; j++) {
      let square = new Graphics();
      let bgColor = (i + j) % 2 === 0 ? '#87B990' : '#7eb187';
      square.beginFill(bgColor);
      square.drawRect(0, 0, gridLength, gridLength);
      square.position.x = gridLength * i;
      square.position.y = gridLength * j;
      square.interactive = true;
      square.isLive = false;
      square.beforeColor = 16777215;
      square.on('pointerdown', changeState);
      app.stage.addChild(square);
    }
  }
};
