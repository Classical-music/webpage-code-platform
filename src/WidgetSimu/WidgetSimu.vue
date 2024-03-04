<script setup>
import { usePageDataStore } from '@store/PageDataStore';
import SimuCommon from './SimuCommon.vue';

let pageData = usePageDataStore()
</script>

<template>
  <div class="simu-body" @click="pageData.setSelItem()">
    <SimuCommon :param="pageData.page"></SimuCommon>
  </div>
</template>

<style scoped>
.simu-body {
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
}
</style>@store/PageDataStore