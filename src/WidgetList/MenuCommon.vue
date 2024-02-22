<script setup>
import MenuGroup from '@WidgetList/MenuGroup.vue';
import MenuItem from '@WidgetList/MenuItem.vue';
import { computed } from 'vue';

const props = defineProps({
  param: Object
})

const compDict = {
  group: MenuGroup,
  item: MenuItem,
}
const getComp = computed(_ => {
  let type = props.param?.type ?? 'item'
  return compDict[type]
})

</script>

<template>
  <component :is="getComp" :param="param" />
</template>

<style scoped>
</style>