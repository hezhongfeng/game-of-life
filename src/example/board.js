import { Application, Graphics } from 'pixi.js';

export default refValue => {
  const RowNumber = 70;

  const gridLength = 10;

  let app = new Application({ width: RowNumber * gridLength, height: RowNumber * gridLength });
  refValue.appendChild(app.view);

  for (let i = 0; i < RowNumber; i++) {
    for (let j = 0; j < RowNumber; j++) {
      let frame = new Graphics();
      let bgColor = (i + j) % 2 === 0 ? '#87B990' : '#7eb187';
      frame.beginFill(bgColor);
      frame.drawRect(0, 0, gridLength, gridLength);
      frame.position.x = gridLength * i;
      frame.position.y = gridLength * j;
      app.stage.addChild(frame);
    }
  }
};
