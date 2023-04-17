<template>
  <div ref="pxRef"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import sence from './example/wood';
// import sence from './example/mask.js';
// import sence from './example/scenegraph.js';
import sence from './example/board';

const pxRef = ref(null);

onMounted(async () => {
  sence(pxRef.value);
});
</script>

<style></style>
