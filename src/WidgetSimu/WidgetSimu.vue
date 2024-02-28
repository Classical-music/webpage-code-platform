<script setup>
import { useDataSetStore } from '@store/DataSetStore';
import SimuCommon from './SimuCommon.vue';

</script>

<template>
  <div class="simu-body" @click="useDataSetStore().setSelItem(undefined)">
    <SimuCommon v-for="item in useDataSetStore().value"
      :param="item"></SimuCommon>
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