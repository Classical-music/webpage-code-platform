<script setup>
import { computed } from 'vue';

const props = defineProps({
    param: Object
})

const bodyStyle = computed(_ => {
  return {
  }
})

const isSelect = computed(_ => {
    if (props.param.isSelect === true) {
        return '3px dashed blue'
    } else {
        return '1px dashed grey'
    }
})
</script>

<template>
    <label v-drag-move:arg="param"
        class="label-body" :style="bodyStyle">{{ param.text}}</label>
</template>

<style scoped>
.label-body {
  border: v-bind(isSelect);
  background: '#ffffff';
  cursor: pointer;
}
</style>