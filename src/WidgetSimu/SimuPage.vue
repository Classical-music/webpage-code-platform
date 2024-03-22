<script setup>
import { computed } from 'vue';
import SimuCommon from '@WidgetSimu/SimuCommon.vue'
import { PageMgr } from '@store/PageMgrStore';

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

function saveToPage() {
  PageMgr.savePage(props.param)
  alert('保存成功')
}

</script>

<template>
  <div :style="bodyStyle" class="screen-body">
    <div class="screen-title">
      <div>{{ param?.name }}</div>
      <button style="cursor: pointer;" @click="saveToPage">保存页面</button>
      <button style="cursor: pointer;" @click="PageMgr.closePage">关闭</button>
    </div>
    <div class="screen-container" v-if="hasChild">
      <SimuCommon v-for="item in param.subs" :param="item"></SimuCommon>
    </div>
  </div>
</template>

<style scoped>
.screen-body {
  border: 3px solid #555555;
  border-radius: 8px 8px 0px 0px;
}

.screen-title {
  width: 100%;
  height: 30px;
  background: grey;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.screen-title>button {
  width: 100px;
  height: 100%;
}

.screen-container {
  width: 100%;
  height: calc(100% - 30px);
  overflow: auto;
  background: #ffffff;
  position: relative;
}
</style>