<script setup>
import { computed } from 'vue';

const props = defineProps({
    param: Object
})

const bodyStyle = computed(_ => {
  return {
  }
})

</script>

<template>
    <div class="label-body" :style="bodyStyle">{{ param.text}}</div>
</template>

<style scoped>
.label-body {
  background: #eeeeee;
  cursor: pointer;
}
</style>