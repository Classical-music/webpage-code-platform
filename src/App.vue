<script setup>
import WidgetList from '@WidgetList/WidgetList.vue';

</script>

<template>
  <div class="main-container">
    <div class="main-container2">
      <WidgetList style="width: 15%"></WidgetList>
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
