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
        "name": "Label-0",
        "isSelect": false,
        "rect": {
          "x": 260,
          "y": 69,
          "w": 100,
          "h": 30
        },
        "text": "label"
      },
      {
        "type": "Image",
        "name": "Image-1",
        "isSelect": false,
        "rect": {
          "x": 0,
          "y": 0,
          "w": 50,
          "h": 50
        },
        "src": ""
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