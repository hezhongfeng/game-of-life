<template>
  <div ref="pxRef"></div>
</template>

<script setup>
import { Application, Sprite, Assets } from 'pixi.js';
// import { RouterLink, RouterView } from 'vue-router';
import { ref, onMounted } from 'vue';
import Logo from './assets/logo.svg';

const pxRef = ref(null);

onMounted(async () => {
  let app = new Application({ width: 640, height: 360 });

  // The application will create a renderer using WebGL, if possible,
  // with a fallback to a canvas render. It will also setup the ticker
  // and the root stage PIXI.Container
  pxRef.value.appendChild(app.view);

  // 材质
  const texture = await Assets.load(Logo);

  // This creates a texture from a 'bunny.png' image
  const bunny = new Sprite(texture);
  // Setup the position of the bunny
  bunny.x = app.renderer.width / 2;
  bunny.y = app.renderer.height / 2;
  // Rotate around the center
  bunny.anchor.x = 0.5;
  bunny.anchor.y = 0.5;
  // Add the bunny to the scene we are building
  app.stage.addChild(bunny);
  // Listen for frame updates
  // app.ticker.add(() => {
  //   // each frame we spin the bunny around a bit
  //   bunny.rotation += 0.01;
  // });

  let elapsed = 0.0;
  app.ticker.add(delta => {
    elapsed += delta;
    bunny.x = 300.0 + Math.cos(elapsed / 50.0) * 100.0;
  });
});
</script>

<style></style>
