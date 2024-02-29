<script setup>
import { useDataSetStore } from '@store/DataSetStore';
import MenuCommon from './MenuCommon.vue';
import { useWidgetMenuStore } from '@store/WidgetMenuStore'
import { CONN } from '@Utils/connect'

function onSave() {
  let str = JSON.stringify(useDataSetStore().value, null, '  ')
  CONN.saveLocalFile(str)
}
</script>

<template>
  <div class="container">
    <div>UI控件列表</div>
    <div v-for="item in useWidgetMenuStore().data" class="item">
      <MenuCommon :param="item"></MenuCommon>
    </div>
    <button style="width: 100px; height: 30px;" @click="onSave">保存</button>
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