<template>
  <div class="app">
    <div ref="pxRef"></div>
    <Button label="Check" icon="pi pi-check" />
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import { init } from '@/game/init.js';
import { ref, onMounted } from 'vue';
const pxRef = ref(null);

onMounted(async () => {
  init(pxRef.value);
});
</script>

<style></style>
