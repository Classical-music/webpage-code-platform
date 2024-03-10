<script setup>

const props = defineProps({
    param: Object
})

function onClick() {
    let cb = props.param?.clickCb ?? null
    if (typeof cb === 'function') {
        cb()
    }
}
</script>

<template>
    <button @click="onClick">{{ param?.name }}</button>
</template>

<style scoped>
button {
    width: 80px;
    height: 30px;
    cursor: pointer;
}
</style>