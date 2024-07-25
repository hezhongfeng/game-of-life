import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useStateStore = defineStore('state', () => {
  const hasBegin = ref(false);

  function changeGameState() {
    hasBegin.value = !hasBegin.value;
    console.log(hasBegin.value);
  }

  return { hasBegin, changeGameState };
});
