<script setup>
import { computed, toRaw } from 'vue';
import { compCtrl } from '@Utils/CtrlMgr';


const props = defineProps({
    param: Object
})

const getComp = computed(_ => {
    let type = props?.param?.type ?? 'Panel'
    return compCtrl(type)
})

const commonStyle = computed(_ => {
    let rect = props.param?.rect
    return {
        width: rect.w + 'px',
        height: rect.h + 'px',
        left: rect.x + 'px',
        top: rect.y + 'px',
    }
})

</script>

<template>
    <component :is="toRaw(getComp.value)" class="common" :style="commonStyle" :param="param" />
</template>

<style scoped>
.common {
    position: absolute;
}
</style>