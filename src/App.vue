<template>
  <div class="app">
    <div ref="pxRef"></div>
    <div class="operations">
      <Button label="设置" @click="settingDialog = true" />
      <Button :label="startLabel" @click="onStart" raised />
      <Button label="清除" @click="clearGame" raised />
    </div>
    <Dialog v-model:visible="settingDialog" modal header="基础设置" class="w-auto">
      <div class="flex items-center gap-4 mb-4">
        <label for="rowNumber" class="font-semibold w-32">方格数量</label>
        <InputNumber class="flex-auto" :modelValue="settingStore.rowNumber" @update:modelValue="settingStore.changeRowNumber" inputId="rowNumber" :useGrouping="false" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="gridLength" class="font-semibold w-32"> 方格长度 </label>
        <InputNumber class="flex-auto" :modelValue="settingStore.gridLength" @update:modelValue="settingStore.changeGridLength" inputId="gridLength" :useGrouping="false" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="cycle" class="font-semibold w-32"> 周期时间（ms） </label>
        <InputNumber class="flex-auto" :modelValue="settingStore.cycle" @update:modelValue="settingStore.changeCycle" inputId="cycle" :useGrouping="false" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
        <Button type="button" label="Save" @click="visible = false"></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import { init, clearCellsState } from '@/game/init.js';
import { ref, onMounted, computed } from 'vue';
import { useStateStore } from '@/stores/state.js';
import { useSettingStore } from '@/stores/setting.js';
import { run, stop } from '@/game/life.js';

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

const cycle = ref(500);
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
