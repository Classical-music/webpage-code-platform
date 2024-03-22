<script setup>
import { computed } from 'vue';
import SimuCommon from '@WidgetSimu/SimuCommon.vue'

const props = defineProps({
    param: Object
})

const pageData = [/*{placeholder}*/]

const subs = computed(_ => {
    return pageData?.subs ?? []
})

</script>

<template>
    <SimuCommon v-for="item in subs" :param="item"></SimuCommon>
</template>

<style scoped>
</style>