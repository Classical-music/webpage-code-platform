<script setup>
import { computed, onMounted } from 'vue';
import SimuCommon from '@WidgetSimu/SimuCommon.vue'

const props = defineProps({
  param: Object
})

onMounted(_ => {
  let subs = props?.param?.subs ?? null
  if (subs) {
    props.param.addChild = child => subs.push(child)
  }
})

const hasChild = computed(_ => {
  let subs = props.param?.subs ?? []
  return subs.length > 0
})

</script>

<template>
  <div class="panel-body">
    <div class="panel-container" v-if="hasChild">
      <SimuCommon v-for="item in props.param.subs" :param="item"></SimuCommon>
    </div>
  </div>
</template>

<style scoped>
.panel-body {
  border: 1px solid #555555;
  border-radius: 8px 8px 0px 0px;
}

.panel-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #ffffff;
  position: relative;
}
</style>