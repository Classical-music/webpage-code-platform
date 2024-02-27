<script setup>
import { computed } from 'vue';
import SimuEditer from '@WidgetSimu/SimuEditer.vue';
import SimuScreen from '@WidgetSimu/Container/SimuScreen.vue';
import SimuButton from '@WidgetSimu/Base/SimuButton.vue';
import SimuLabel from '@WidgetSimu/Base/SimuLabel.vue';
import SimuLineEdit from '@WidgetSimu/Base/SimuLineEdit.vue';
import { useDataSetStore } from '@store/DataSetStore';

let dataSet = useDataSetStore()

const props = defineProps({
    param: Object
})

const compDict = {
  Screen: SimuScreen,
  Button: SimuButton,
  Label: SimuLabel,
  LineEdit: SimuLineEdit
}
const getComp = computed(_ => {
  let type = props.param?.type ?? 'Screen'
  return compDict[type]
})

const commonStyle = computed(_ => {
  let param = props.param
  return {
    left: param?.pos?.x + 'px',
    top: param?.pos?.y + 'px',
    width: param?.size?.w + 'px',
    height: param?.size?.h + 'px'
  }
})

const isSelect = computed(_ => {
    return props.param.isSelect === true
})

</script>

<template>
  <component v-if="!isSelect" :is="getComp" :param="param"
    class="common-class" :style="commonStyle"
    @click.stop="dataSet.setSelItem(param)">
  </component>
  <SimuEditer v-else :param="param"></SimuEditer>
</template>

<style scoped>
.common-class {
  position: absolute;
}
</style>