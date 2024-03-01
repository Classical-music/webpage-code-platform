<script setup>
import { useDataSetStore } from '@store/DataSetStore';

const props = defineProps({
    param: Object
})

function onClick() {
    let type = props.param?.type
    if (type !== 'Page') return
    useDataSetStore().resetPage()
}
</script>

<template>
    <div class="name" @click.stop="onClick">{{ param?.name }}/{{ param?.id }}</div>
</template>

<style scoped>
.name {
    cursor: pointer;
}
</style>