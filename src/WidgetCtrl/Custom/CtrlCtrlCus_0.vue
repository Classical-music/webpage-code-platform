<script setup>
import { computed, toRaw } from 'vue';
import { compCtrl } from '@Utils/CtrlMgr';

const props = defineProps({
  param: Object
})

const pageData = {
  "mainType": "Panel",
  "main": {
    "type": "Panel",
    "name": "Panel-0",
    "isSelect": false,
    "rect": {
      "x": 0,
      "y": 0,
      "w": 400,
      "h": 300
    },
    "subs": [
      {
        "type": "Label",
        "name": "Label-1",
        "isSelect": false,
        "rect": {
          "x": 55,
          "y": 65,
          "w": 100,
          "h": 30
        },
        "text": "label"
      },
      {
        "type": "CtrlCus_1",
        "name": "CtrlCus_1-3",
        "isSelect": false,
        "rect": {
          "x": 198,
          "y": 107,
          "w": 182,
          "h": 97
        },
        "mainType": "Label"
      }
    ]
  },
  "type": "CtrlCus_0"
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