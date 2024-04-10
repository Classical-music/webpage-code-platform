<script setup>
import { usePageDataStore } from "@store/PageMgrStore";
import SimuCommon from './SimuCommon.vue';

let pageData = usePageDataStore()
</script>

<template>
  <div class="simu-body" @click="pageData.setSelItem()">
    <SimuCommon :param="pageData.page"></SimuCommon>
    <SimuCommon :param="pageData.editPage"></SimuCommon>
  </div>
</template>

<style scoped>
.simu-body {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  user-select: none;
}
</style>