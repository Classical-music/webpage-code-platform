<script setup>
import MenuCommon from './MenuCommon.vue';
import { useWidgetMenuStore } from '@store/WidgetMenuStore'

</script>

<template>
  <div class="container">
    <div>UI控件列表</div>
    <div v-for="item in useWidgetMenuStore().data" class="item">
      <MenuCommon :param="item"></MenuCommon>
    </div>
  </div>
</template>

<style scoped>
.container {
  border: 1px solid grey;
  background: rgb(241, 157, 62);
}

.item {
  background: rgb(169, 165, 165);
  padding: 12px 6px;
  box-sizing: border-box;
  border-top: 1px solid;
}
</style>