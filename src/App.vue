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
  //   document.body.appendChild(app.view);
  // pxRef.value.appendChild(app.view);

  // The application will create a renderer using WebGL, if possible,
  // with a fallback to a canvas render. It will also setup the ticker
  // and the root stage PIXI.Container
  // const app = new Application({ width: 640, height: 360 });
  // The application will create a canvas element for you that you
  // can then insert into the DOM
  pxRef.value.appendChild(app.view);
  // document.body.appendChild(app.view)
  // load the texture we need
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
  app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    bunny.rotation += 0.01;
  });
});
</script>

<style></style>
