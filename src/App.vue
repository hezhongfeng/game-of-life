<template>
  <div class="app">
    <div ref="pxRef"></div>
    <div class="operations">
      <Presets></Presets>
      <Button :label="startLabel" @click="onStart" raised />
      <Button label="清除" @click="clearGame" raised />
      <Button label="设置" @click="settingDialog = true" />
    </div>
    <Dialog v-model:visible="settingDialog" modal header="基础设置" class="w-auto">
      <div class="flex items-center gap-4 mb-4">
        <label for="rowNumber" class="font-semibold w-32"> 单行数量 </label>
        <InputNumber
          class="flex-auto"
          min="10"
          max="100"
          :modelValue="settingStore.rowNumber"
          @update:modelValue="settingStore.changeRowNumber"
          inputId="rowNumber"
          :useGrouping="false"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="gridLength" class="font-semibold w-32"> 方格大小 </label>
        <InputNumber
          class="flex-auto"
          min="1"
          max="100"
          :modelValue="settingStore.gridLength"
          @update:modelValue="settingStore.changeGridLength"
          inputId="gridLength"
          :useGrouping="false"
        />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="cycle" class="font-semibold w-32"> 变化周期（ms） </label>
        <InputNumber class="flex-auto" min="50" max="1000" :modelValue="settingStore.cycle" @update:modelValue="settingStore.changeCycle" inputId="cycle" :useGrouping="false" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="取消" severity="secondary" @click="settingDialog = false"></Button>
        <Button type="button" label="保存" @click="onSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import { init, clearCellsState, reDrawGrid } from '@/game/init.js';
import { ref, onMounted, computed } from 'vue';
import { useStateStore } from '@/stores/state.js';
import { useSettingStore } from '@/stores/setting.js';
import { run, stop } from '@/game/life.js';
import Presets from './components/presets/Presets.vue';

const pxRef = ref(null);
const stateStore = useStateStore();
const settingStore = useSettingStore();

const settingDialog = ref(false);

onMounted(() => {
  init(pxRef.value);
});

const startLabel = computed(() => (stateStore.hasBegin ? '暂停' : '开始'));

const onStart = () => {
  if (stateStore.hasBegin) {
    stop();
  } else {
    run();
  }
  stateStore.changeGameState();
};

const clearGame = () => {
  clearCellsState();
  if (stateStore.hasBegin) {
    stateStore.changeGameState();
    stop();
  }
};

const onSave = () => {
  settingDialog.value = false;
  reDrawGrid();
};
</script>

<style lang="scss">
.app {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  min-height: 100vh;
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
