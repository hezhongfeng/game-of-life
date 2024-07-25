<template>
  <div class="app">
    <div ref="pxRef"></div>
    <div class="operations">
      <Button :label="startLabel" @click="stateStore.changeGameState" raised />
      <Button label="清除" raised />
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import { init } from '@/game/init.js';
import { ref, onMounted, computed } from 'vue';
import { useStateStore } from '@/stores/state.js';

const pxRef = ref(null);
const stateStore = useStateStore();

onMounted(() => {
  init(pxRef.value);
});

const startLabel = computed(() => (stateStore.hasBegin ? '暂停' : '开始'));
</script>

<style lang="scss">
.app {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  min-height: 100vh;
  padding: 20px;
  .operations {
    padding-left: 10px;
    padding-right: 10px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
