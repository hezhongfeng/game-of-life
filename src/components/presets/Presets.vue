<template>
  <div class="presets">
    <Button label="预设" @click="settingDialog = true" />
    <Dialog v-model:visible="settingDialog" modal header="预设" class="w-auto">
      <Card>
        <template #title>稳定态</template>
        <template #content>
          <div class="flex flex-auto gap-2">
            <img src="@/assets/still/Game_of_life_beehive.svg.png" class="hover:brightness-50" @click="onPreset('1-1')" />
            <img src="@/assets/still/Game_of_life_flower.svg.png" class="hover:brightness-50" @click="onPreset('1-2')" />
            <img src="@/assets/still/Game_of_life_boat.svg.png" class="hover:brightness-50" @click="onPreset('1-3')" />
            <img src="@/assets/still/Game_of_life_loaf.svg.png" class="hover:brightness-50" @click="onPreset('1-4')" />
          </div>
        </template>
      </Card>
      <Card>
        <template #title>震荡态</template>
        <template #content>
          <div class="flex flex-auto gap-2">
            <img src="@/assets/oscillators/Game_of_life_blinker.gif" class="hover:brightness-50" @click="onPreset('2-1')" />
            <img src="@/assets/oscillators/Game_of_life_beacon.gif" class="hover:brightness-50" @click="onPreset('2-2')" />
            <img src="@/assets/oscillators/Game_of_life_toad.gif" class="hover:brightness-50" @click="onPreset('2-3')" />
          </div>
        </template>
      </Card>
      <Card>
        <template #title>移动态</template>
        <template #content>
          <div class="flex flex-auto gap-2">
            <img src="@/assets/spaceships/Game_of_life_animated_glider.gif" class="hover:brightness-50" @click="onPreset('3-1')" />
            <img src="@/assets/spaceships/Game_of_life_animated_LWSS.gif" class="hover:brightness-50" @click="onPreset('3-2')" />
            <img src="@/assets/spaceships/Animated_Mwss.gif" class="hover:brightness-50" @click="onPreset('3-3')" />
          </div>
        </template>
      </Card>

      <!-- <div class="flex justify-end gap-2 mt-4">
        <Button type="button" label="取消" severity="secondary" @click="settingDialog = false"></Button>
        <Button type="button" label="保存" @click="onSave"></Button>
      </div> -->
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { setPresetShape } from '@/game/init.js';

const settingDialog = ref(false);

const onPreset = (index) => {
  console.log(index);
  setPresetShape(index);
  settingDialog.value = false;
};
</script>

<style lang="scss">
.presets {
}
</style>
