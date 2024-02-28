
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
  <img class="img-body" :style="bodyStyle" :src="param.src" />
</template>

<style scoped>
.img-body {
  border: 1px solid #555555;
  background: #eeeeee;
  cursor: pointer;
}
</style>