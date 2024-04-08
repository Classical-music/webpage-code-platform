<script setup>
import { computed } from 'vue'
import { usePageDataStore } from "@store/PageMgrStore";
import { allCtrls, baseCtrls } from '@Utils/CtrlMgr';

const pageData = usePageDataStore()

const selItem = computed(_ => {
  return pageData.selItem
})

</script>

<template>
  <div v-if="selItem">
    <div class="attr-row">
      <label class="attr-left-label">控件类型:</label>
      <select v-model="selItem.type" class="attr-right-val">
        <option v-for="item in allCtrls" :value="item">{{ item }}</option>
      </select>
    </div>

    <div v-if="selItem.mainType" class="attr-row">
      <label class="attr-left-label">主体控件:</label>
      <select v-model="selItem.mainType" class="attr-right-val">
        <option v-for="item in baseCtrls" :value="item">{{ item }}</option>
      </select>
    </div>

    <div class="attr-row">
      <label class="attr-left-label">控件名称</label>
      <input v-model="selItem.name">
    </div>

    <div class="attr-row">
      <label class="attr-left-label">控件坐标:</label>
      <div class="attr-right-val">
        <input v-model="selItem.rect.x" style="width: 40px;" />px,
        <input v-model="selItem.rect.y" style="width: 40px;" />px
      </div>
    </div>

    <div class="attr-row">
      <label class="attr-left-label">控件宽高:</label>
      <div class="attr-right-val">
        <input v-model="selItem.rect.w" style="width: 40px;" />px,
        <input v-model="selItem.rect.h" style="width: 40px;" />px
      </div>
    </div>

    <div v-if="selItem.text !== undefined" class="attr-row">
      <label class="attr-left-label">控件文本:</label>
      <input v-model="selItem.text" class="attr-right-val" />
    </div>

    <div v-if="selItem.src !== undefined" class="attr-row">
      <label class="attr-left-label">图片资源:</label>
      <div class="attr-right-val">
        <input v-model="selItem.src" class="attr-right-val" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.attr-row {
  display: flex;
  flex-direction: row;
}

.attr-left-label {
  width: 100px;
  line-height: 30px;
  text-align: right;
  margin-right: 40px;
}

.attr-right-val {
  width: 150px;
  height: 30px;
  box-sizing: border-box;
}
</style>