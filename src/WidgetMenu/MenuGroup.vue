<script setup>
import { computed, onMounted } from 'vue';
import MenuCommon from './MenuCommon.vue';

const props = defineProps({
    param: Object
})

const hasChild = computed(_ => {
    return props.param?.expand ?? false
})

const subs = computed(_ => {
    return props.param?.subs ?? []
})

function doExpand() {
    let param = props.param
    param.expand = !param.expand
}

onMounted(_ => {
    let initCb = props.param?.initCb
    if (initCb) {
        initCb()
    }
})

</script>

<template>
    <div>
        <div class="title" @click="doExpand">{{ param?.name ?? '标题' }}</div>
        <div v-if="hasChild" class="subs-container">
            <MenuCommon v-for="item in subs" :param="item"></MenuCommon>
        </div>
    </div>
</template>

<style scoped>
.title {
    cursor: pointer;
}
.subs-container {
    margin-left: 20px;
}
</style>