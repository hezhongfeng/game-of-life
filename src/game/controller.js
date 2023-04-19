import { Text, TextStyle } from 'pixi.js';
import { run, stop } from './life';
import { hasBegin, changeGameState, clearCellsState } from './common.js';

export default app => {
  const style = new TextStyle({
    fontFamily: 'Comfortaa',
    fontSize: 28,
    fontWeight: 'bold',
    fill: 0x333344
  });

  const startText = new Text('开始', style);
  const clearText = new Text('清除', style);

  startText.x = app.view.width - 50;
  startText.y = app.view.height - 60;
  startText.anchor.x = 0.5;
  startText.anchor.y = 0.5;
  startText.interactive = true;
  startText.cursor = 'pointer';

  clearText.x = app.view.width - 50;
  clearText.y = app.view.height - 20;
  clearText.anchor.x = 0.5;
  clearText.anchor.y = 0.5;
  clearText.interactive = true;
  clearText.cursor = 'pointer';

  const start = () => {
    if (hasBegin) {
      startText.text = '开始';
      stop();
    } else {
      startText.text = '暂停';
      run();
    }
    changeGameState();
  };

  const clearGame = () => {
    startText.text = '开始';
    stop();
    clearCellsState();
    if (hasBegin) {
      changeGameState();
    }
  };

  startText.on('pointerdown', start);
  clearText.on('pointerdown', clearGame);

  app.stage.addChild(startText);
  app.stage.addChild(clearText);
};
