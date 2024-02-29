<script setup>
import MenuGroup from '@WidgetMenu/MenuGroup.vue';
import MenuItem from '@WidgetMenu/MenuItem.vue';
import { useDataSetStore } from '@store/DataSetStore';
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

function addItem() {
  let type = props.param?.name
  useDataSetStore().addItem(type)
}

</script>

<template>
  <component :is="getComp" :param="param" @click.stop="addItem"/>
</template>

<style scoped>
</style>