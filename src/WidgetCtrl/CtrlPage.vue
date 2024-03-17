<script setup>
import { computed } from 'vue';
import CtrlCommon from './CtrlCommon.vue';


const props = defineProps({
    param: Object
})

const subs = computed(_ => {
    return props.param?.subs ?? []
})

</script>

<template>
    <div class="container-page">
        <CtrlCommon v-for="item in subs" :param="item"></CtrlCommon>
    </div>
</template>

<style scoped>
.container-page {
    border: 1px dashed grey;
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>