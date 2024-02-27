<script setup>
import { computed } from 'vue';
import SimuCommon from '@WidgetSimu/SimuCommon.vue'

const props = defineProps({
  param: Object
})

const bodyStyle = computed(_ => {
  return {
  }
})

const hasChild = computed(_ => {
  let subs = props.param?.subs ?? []
  return subs.length > 0
})

</script>

<template>
  <div :style="bodyStyle" class="screen-body">
    <div class="screen-title"></div>
    <div class="screen-container" v-if="hasChild">
      <SimuCommon v-for="item in props.param.subs" :param="item"></SimuCommon>
    </div>
  </div>
</template>

<style scoped>
.screen-body {
  border: 3px solid grey;
  border-radius: 8px 8px 0px 0px;
}

.screen-title {
  width: 100%;
  height: 20px;
  background: grey;
  cursor: pointer;
}

.screen-container {
  width: 100%;
  height: calc(100% - 20px);
  overflow: auto;
  background: #ffffff;
  position: relative;
}
</style>