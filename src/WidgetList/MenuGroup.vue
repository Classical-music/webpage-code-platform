<script setup>
import { computed } from 'vue';
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

</script>

<template>
    <div>
        <div class="title">{{ param?.name ?? '标题' }}</div>
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