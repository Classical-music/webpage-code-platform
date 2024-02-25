
import { parseCache } from 'vue/compiler-sfc';

<script setup>
import { computed } from 'vue';

const props = defineProps({
  param: Object
})

const bodyStyle = computed(_ => {
  let pos = props.param?.pos ?? {}
  return {
    left: pos?.x + 'px',
    top: pos?.y + 'px',
    width: '100px',
    height: '30px',
  }
})
</script>

<template>
  <div v-drag-move.arg="param"
    class="button-body" :style="bodyStyle">{{ param.text }}</div>
</template>

<style scoped>
.button-body {
  position: absolute;
  border: 1px solid grey;
  background: '#ffffff';
  cursor: pointer;
}
</style>