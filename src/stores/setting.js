import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSettingStore = defineStore('setting', () => {
  const cycle = ref(200);
  const changeCycle = (value) => {
    cycle.value = value;
  };

  const rowNumber = ref(40);
  const changeRowNumber = (value) => {
    rowNumber.value = value;
  };

  const gridLength = ref(20);
  const changeGridLength = (value) => {
    gridLength.value = value;
  };

  return { cycle, changeCycle, rowNumber, changeRowNumber, gridLength, changeGridLength };
});
