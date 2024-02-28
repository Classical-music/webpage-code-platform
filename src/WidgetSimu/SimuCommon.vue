<script setup>
import { computed } from 'vue';
import { useDataSetStore } from '@store/DataSetStore';
import SimuEditer from '@WidgetSimu/SimuEditer.vue';
import SimuScreen from '@WidgetSimu/Container/SimuScreen.vue';
import SimuPanel from '@WidgetSimu/Container/SimuPanal.vue';
import SimuButton from '@WidgetSimu/Base/SimuButton.vue';
import SimuLabel from '@WidgetSimu/Base/SimuLabel.vue';
import SimuLineEdit from '@WidgetSimu/Base/SimuLineEdit.vue';
import SimuImage from './Base/SimuImage.vue';

let dataSet = useDataSetStore()

const props = defineProps({
    param: Object
})

const compDict = {
  Screen: SimuScreen,
  Panel: SimuPanel,
  Button: SimuButton,
  Label: SimuLabel,
  LineEdit: SimuLineEdit,
  Image: SimuImage,
}
const getComp = computed(_ => {
  let type = props.param?.type ?? 'Screen'
  return compDict[type]
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
  <div :style="commonStyle" class="common-body">
    <component :is="getComp" :param="param" class="common-class"
      v-drag-move:arg="param"
      @click.stop="dataSet.setSelItem(param)">
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