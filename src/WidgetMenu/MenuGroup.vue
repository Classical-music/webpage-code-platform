<script setup>
import { onMounted, toRaw } from "vue";
const props = defineProps({
    param: Object
})

function setExpand() {
    props.param.expand = !props.param.expand
}

onMounted(_ => {
    if (props.param?.initCb) {
        props.param?.initCb()
    }
})

</script>

<template>
    <div class="title" @click="setExpand">{{ param.name }}</div>
    <div v-if="param.expand" class="subs">
        <div v-for="item in param.subs">
            <component :is="toRaw(item).comp" :param="item"></component>
        </div>
    </div>
</template>

<style scoped>
.title {
    cursor: pointer;
}
.subs {
    margin-left: 20px;
}
</style>