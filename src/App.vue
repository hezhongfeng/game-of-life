<template>
  <div ref="pxRef"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { init } from './game/init';

const pxRef = ref(null);

onMounted(async () => {
  init(pxRef.value);
});
</script>

<style></style>
