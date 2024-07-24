<template>
  <div ref="pxRef"></div>
</template>

<script setup>
import { init } from '@/game/init.js';
import { ref, onMounted } from 'vue';
const pxRef = ref(null);

onMounted(async () => {
  init(pxRef.value);
});
</script>

<style></style>
