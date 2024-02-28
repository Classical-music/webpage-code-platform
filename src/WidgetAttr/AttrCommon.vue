<script setup>
import { computed } from 'vue'
import { useDataSetStore } from '@store/DataSetStore.js'

const dataSet = useDataSetStore()

const selItem = computed(_ => {
    return dataSet.getSelItem
})

const typeList = [
    'Screen',
    'Panel',
    'Button',
    'Label',
    'LineEdit',
    'Image',
]

</script>

<template>
    <div v-if="selItem">
        <div class="attr-row">
            <label class="attr-left-label">控件类型:</label>
            <select v-model="selItem.type" class="attr-right-val">
                <option v-for="item in typeList" :value="item">{{ item }}</option>
            </select>
        </div>

        <div class="attr-row">
            <label class="attr-left-label">控件坐标:</label>
            <div class="attr-right-val">
                <input v-model="selItem.rect.x" style="width: 50px;" />px,
                <input v-model="selItem.rect.y" style="width: 50px;" />px
            </div>
        </div>

        <div class="attr-row">
            <label class="attr-left-label">控件宽高:</label>
            <div class="attr-right-val">
                <input v-model="selItem.rect.w" style="width: 50px;" />px,
                <input v-model="selItem.rect.h" style="width: 50px;" />px
            </div>
        </div>

        <div v-if="selItem.text !== undefined"  class="attr-row">
            <label class="attr-left-label">控件文本:</label>
            <input v-model="selItem.text" class="attr-right-val" />
        </div>

        <div v-if="selItem.src !== undefined" class="attr-row">
            <label class="attr-left-label">图片资源:</label>
            <div class="attr-right-val">
                <input v-model="selItem.src" class="attr-right-val"/>
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
    width: 150px;
    line-height: 30px;
    text-align: right;
    margin-right: 40px;
}
.attr-right-val {
    width: 200px;
    height: 30px;
    box-sizing: border-box;
}
</style>