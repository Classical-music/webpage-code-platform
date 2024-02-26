<script setup>
import WidgetMenu from '@WidgetMenu/WidgetMenu.vue';
import WidgetSimu from '@WidgetSimu/WidgetSimu.vue';
import WidgetAttr from '@WidgetAttr/WidgetAttr.vue';
</script>

<template>
  <div class="main-container">
    <div class="main-container2" @drop="onDrag" @dragover="onDragOver">
      <WidgetMenu style="width: 15%; z-index: 10;"></WidgetMenu>
      <div style="width: 65%; height: 100%;">
        <WidgetSimu></WidgetSimu>
      </div>
      <WidgetAttr style="width: 20%; z-index: 10;"></WidgetAttr>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
}

.switch-btn {
  width: 100px;
  height: 30px;
}

.main-container2 {
  display: flex;
  flex-direction: row;
  height: 100%;
  flex-flow: 1;
  flex-shrink: 1;
}

</style>
