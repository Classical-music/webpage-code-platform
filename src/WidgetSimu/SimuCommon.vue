<script setup>
import { computed } from 'vue';
import SimuScreen from '@WidgetSimu/Container/SimuScreen.vue';
import SimuButton from '@WidgetSimu/Base/SimuButton.vue';

const props = defineProps({
    param: Object
})

const compDict = {
  Screen: SimuScreen,
  Button: SimuButton,
}
const getComp = computed(_ => {
  let type = props.param?.type ?? 'Screen'
  return compDict[type]
})

</script>

<template>
    <component :is="getComp" :param="param"></component>
</template>

<style scoped>
</style>