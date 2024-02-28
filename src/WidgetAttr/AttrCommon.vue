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
        <div>
            <label>控件类型: </label>
            <select v-model="selItem.type">
                <option v-for="item in typeList" :value="item">{{ item }}</option>
            </select>
        </div>

        <div>
            <label>控件坐标：</label>
            <input v-model="selItem.rect.x" style="width: 50px;" />px,
            <input v-model="selItem.rect.y" style="width: 50px;" />px
        </div>

        <div>
            <label>控件宽高: </label>
            <input v-model="selItem.rect.w" style="width: 50px;" />px,
            <input v-model="selItem.rect.h" style="width: 50px;" />px
        </div>

        <div v-if="selItem.text">
            <label>控件文本: </label>
            <input v-model="selItem.text" style="width: 150px;" />
        </div>
    </div>

</template>

<style scoped>
</style>