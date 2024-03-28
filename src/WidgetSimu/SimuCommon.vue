<script setup>
import { computed, ref, toRaw } from 'vue';
import { usePageDataStore } from "@store/PageMgrStore";
import { compSimu } from '@Utils/CtrlMgr'
import SimuEditer from '@WidgetSimu/SimuEditer.vue';

let pageData = usePageDataStore()

const props = defineProps({
    param: [Object, null]
})

const getComp = computed(_ => {
  let type = props.param?.type ?? 'Page'
  return compSimu(type)
})

const commonStyle = computed(_ => {
  let param = props.param
  return {
    left: param?.rect?.x + 'px',
    top: param?.rect?.y + 'px',
    width: param?.rect?.w + 'px',
    height: param?.rect?.h + 'px'
  }
})

const isSelect = computed(_ => {
    return props.param.isSelect === true
})

</script>

<template>
  <div v-if="param" :style="commonStyle" class="common-body">
    <component :is="toRaw(getComp?.value)" :param="param" class="common-class"
      v-drag-move:arg="param"
      @click.stop="pageData.setSelItem(param)">
    </component>
    <SimuEditer v-if="isSelect" :param="param"></SimuEditer>
  </div>

</template>

<style scoped>
.common-body {
  position: absolute;
  box-sizing: border-box;
}
.common-class {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>