<script setup>
import { computed, onMounted, reactive, toRaw } from 'vue';
import { compSimu } from '@Utils/CtrlMgr';

const props = defineProps({
    param: Object
})

const pageData = reactive({
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
    "subs": []
  },
  "type": "CtrlCus_0"
})

onMounted(_ => {
    props.param.addChild = function(item) {
        pageData.main.subs.push(item)
    }
})

const main = computed(_ => {
    return pageData?.main
})

const getComp = computed(_ => {
  let type = pageData?.main?.type ?? 'Panel'
  return compSimu(type)
})

</script>

<template>
    <component :is="toRaw(getComp.value)" :param="main" />
</template>

<style scoped>
</style>