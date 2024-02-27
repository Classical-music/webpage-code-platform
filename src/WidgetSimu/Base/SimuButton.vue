
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
  <div class="button-body" :style="bodyStyle">{{ param.text }}</div>
</template>

<style scoped>
.button-body {
  border: 1px solid grey;
  background: #eeeeee;
  cursor: pointer;
}
</style>