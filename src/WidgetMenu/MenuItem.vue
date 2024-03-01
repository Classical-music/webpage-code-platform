<script setup>
const props = defineProps({
    param: Object
})
</script>

<template>
    <div class="name" @click="param?.clickCb">{{ param?.name }}</div>
</template>

<style scoped>
.name {
    cursor: pointer;
}
</style>