<script setup>
import { computed } from 'vue'
import { useDataSetStore } from '@store/DataSetStore.js'

const dataSet = useDataSetStore()

const selItem = computed(_ => {
    return dataSet.getSelItem
})

const typeList = [
    'Screen',
    'Button',
    'Label',
    'LineEdit',
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
            <input v-model="selItem.pos.x" />ps,
            <input v-model="selItem.pos.y" />ps
        </div>

        <div>
            <label>控件宽高: </label>
            <input v-model="selItem.size.w" />ps,
            <input v-model="selItem.size.h" />ps
        </div>
    </div>

</template>

<style scoped>
</style>