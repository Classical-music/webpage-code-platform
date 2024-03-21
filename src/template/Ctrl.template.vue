<script setup>
import { computed } from 'vue';
import CtrlCommon from '@WidgetCtrl/CtrlCommon.vue';

const props = defineProps({
    param: Object
})

const pageData = [/*{placeholder}*/]

const subs = computed(_ => {
    return pageData?.subs ?? []
})

</script>

<template>
    <CtrlCommon v-for="item in subs" :param="item"></CtrlCommon>
</template>

<style scoped>
.container-page {
    border: 1px dashed grey;
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>