<script setup>
import { computed, onMounted, reactive, toRaw } from 'vue';
import { compSimu } from '@Utils/CtrlMgr';

const props = defineProps({
    param: Object
})

const pageData = reactive([/*{placeholder}*/])

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