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
        return '3px solid blue'
    } else {
        return '1px solid grey'
    }
})

</script>

<template>
    <input v-drag-move:arg="param"
        class="line-edit-body" :style="bodyStyle"
        v-model="param.text" />
</template>

<style scoped>
.line-edit-body {
  border: v-bind(isSelect);
  background: '#ffffff';
  cursor: pointer;
}
</style>