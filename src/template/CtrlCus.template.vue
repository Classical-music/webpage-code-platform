<script setup>
import { computed, toRaw } from 'vue';
import { compCtrl } from '@Utils/CtrlMgr';

const props = defineProps({
  param: Object
})

const pageData = [/*{placeholder}*/]

const main = computed(_ => {
  return pageData?.main
})

const getComp = computed(_ => {
  let type = pageData?.main?.type ?? 'Panel'
  return compCtrl(type)
})

</script>

<template>
  <component :is="toRaw(getComp?.value)" :param="main" />
</template>

<style scoped></style>