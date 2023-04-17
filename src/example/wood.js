import { Application, Sprite, Rectangle, Assets } from 'pixi.js';
// import Logo from '../assets/logo.svg';
import Wood from '../assets/wood.png';

export default async refValue => {
  // Create the application helper and add its render target to the page
  const app = new Application({ width: 640, height: 640 });
  refValue.appendChild(app.view);

  // 87B990
  // 7eb187

  Assets.load(Wood).then(texture => {
    // // auxiliar flag for toggling the texture
    // let isEggHead = true;

    // // create a new Sprite from the resolved loaded texture
    // const character = new PIXI.Sprite(texture);
    // character.anchor.set(0.5);
    // character.x = app.screen.width / 2;
    // character.y = app.screen.height / 2;
    // character.interactive = true;
    // character.cursor = 'pointer';

    // app.stage.addChild(character);

    // character.on('pointertap', async () => {
    //     isEggHead = !isEggHead;
    //     // These promise are already resolved in the cache.
    //     character.texture = await PIXI.Assets.load(isEggHead ? 'eggHead' : 'flowerTop');
    // });
    // const texture = await Texture.from(Wood);

    // texture.frame();

    // await texture.

    const sprite = new Sprite(texture);

    // const sprite = new TilingSprite(texture, app.screen.width, app.screen.height);

    let rectangle = new Rectangle(0, 0, 35, 35);
    // let rectangle = new Rectangle();
    texture.frame = rectangle;

    app.stage.addChild(sprite);
  });

  // // Add a container to center our sprite stack on the page
  // const container = new Container();
  // // 这里很奇怪，明明坐标是是屏幕的中心，难道这里设置的是container的中心？
  // container.x = app.screen.width / 2;
  // container.y = app.screen.height / 2;
  // app.stage.addChild(container);

  // const texture = await Texture.from(Wood);

  // // texture.frame();

  // // await texture.

  // const sprite = new Sprite(texture);

  // let rectangle = new Rectangle(-256, -32, 24, 25);
  // // let rectangle = new Rectangle();
  // texture.frame = rectangle;

  // const sprite = new TilingSprite(texture, 256, 256);

  // //Tell the texture to use that rectangular section

  // let sprite = Sprite.from(Wood);

  // sprite.x = app.screen.width / 2;
  // sprite.y = app.screen.height / 2;

  // 这里的0.5是相对于自身的宽和高，但是也不懂为啥设置锚点可以移动spirte到中间
  // The default is (0,0), this means the sprite's origin is the top left.
  // 懂了，这里的anchor相当于原点，不是锚点（有点割裂）
  // sprite.anchor.x = 0.5;
  // sprite.anchor.y = 0.5;

  // app.stage.addChild(sprite);
};
