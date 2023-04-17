import { Application, Sprite } from 'pixi.js';
// import Logo from '../assets/logo.svg';
import Wood from '../assets/wood.png';

export default refValue => {
  // Create the application helper and add its render target to the page
  const app = new Application({ width: 640, height: 360 });
  refValue.appendChild(app.view);

  // // Add a container to center our sprite stack on the page
  // const container = new Container();
  // // 这里很奇怪，明明坐标是是屏幕的中心，难道这里设置的是container的中心？
  // container.x = app.screen.width / 2;
  // container.y = app.screen.height / 2;
  // app.stage.addChild(container);

  // const texture = Texture.from(Logo);
  // const sprite = new Sprite(texture);
  let sprite = Sprite.from(Wood);

  sprite.x = app.screen.width / 2;
  sprite.y = app.screen.height / 2;

  // 这里的0.5是相对于自身的宽和高，但是也不懂为啥设置锚点可以移动spirte到中间
  // The default is (0,0), this means the sprite's origin is the top left.
  // 懂了，这里的anchor相当于原点，不是锚点（有点割裂）
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;

  app.stage.addChild(sprite);

  // Create the 3 sprites, each a child of the last
  // const sprites = [];
  // let parent = container;

  // let sprite = Sprite.from(Logo);
  // sprite.anchor.set(0.5);
  // // sprite.x = 100;
  // // sprite.y = 100;
  // sprite.scale.y = 0.5;
  // parent.addChild(sprite);
  // sprites.push(sprite);

  // for (let i = 0; i < 3; i++) {
  //   let sprite = Sprite.from(Logo);
  //   sprite.anchor.set(0.5);
  //   parent.addChild(sprite);
  //   sprites.push(sprite);
  //   parent = sprite;
  // }

  // // Set all sprite's properties to the same value, animated over time
  // let elapsed = 0.0;
  // app.ticker.add(delta => {
  //   elapsed += delta / 60;
  //   const amount = Math.sin(elapsed);
  //   const scale = 1.0 + 0.25 * amount;
  //   const alpha = 0.75 + 0.25 * amount;
  //   const angle = 40 * amount;
  //   const x = 75 * amount;
  //   for (let i = 0; i < sprites.length; i++) {
  //     const sprite = sprites[i];
  //     sprite.scale.set(scale);
  //     sprite.alpha = alpha;
  //     sprite.angle = angle;
  //     sprite.x = x;
  //   }
  // });
};
