import { Text, TextStyle, Container } from 'pixi.js';
import { run, stop } from './life';
import { hasBegin, changeGameState } from './common.js';

export default app => {
  const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 28,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round'
  });

  const basicText = new Text('开始', style);

  basicText.x = app.view.width - 50;
  basicText.y = app.view.height - 30;
  basicText.anchor.x = 0.5;
  basicText.anchor.y = 0.5;
  basicText.interactive = true;
  basicText.cursor = 'pointer';

  const container = new Container();

  container.addChild(basicText);

  const start = () => {
    if (hasBegin) {
      stop();
    } else {
      run();
    }
    changeGameState();
  };

  basicText.on('pointerdown', start);

  app.stage.addChild(container);
};
