<script setup>
import { toRaw } from 'vue';

const props = defineProps({
  param: Object
})

</script>

<template>
  <component :is="toRaw(param).comp" :param="param"></component>
</template>

<style scoped>
</style>