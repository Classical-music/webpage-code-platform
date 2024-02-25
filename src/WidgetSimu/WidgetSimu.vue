<script setup>
import { useDataSetStore } from '@store/DataSetStore';
import SimuCommon from './SimuCommon.vue';

</script>

<template>
  <div style="position: relative;">
    <SimuCommon v-for="item in useDataSetStore().value"
      :param="item"></SimuCommon>
  </div>
</template>
<style scoped></style>