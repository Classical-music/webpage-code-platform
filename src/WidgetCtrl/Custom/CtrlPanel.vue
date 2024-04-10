<script setup>
import { computed, toRaw } from 'vue';
import { compCtrl } from '@Utils/CtrlMgr';

const props = defineProps({
  param: Object
})

const pageData = {
  "type": "Panel",
  "name": "Panel-0",
  "isSelect": false,
  "rect": {
    "x": 0,
    "y": 0,
    "w": 400,
    "h": 300
  },
  "subs": []
}

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