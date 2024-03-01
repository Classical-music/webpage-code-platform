<script setup>
import { useDataSetStore } from '@store/DataSetStore';
import SimuCommon from './SimuCommon.vue';

let dataSet = useDataSetStore()
</script>

<template>
  <div class="simu-body" @click="dataSet.setSelItem()">
    <SimuCommon :param="dataSet.page"></SimuCommon>
  </div>
</template>

<style scoped>
.simu-body {
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
}
</style>