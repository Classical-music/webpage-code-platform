<script setup>
const props = defineProps({
    param: Object
})
</script>

<template>
    <div class="name">{{ param?.name }}</div>
</template>

<style scoped>
.name {
    cursor: pointer;
}
</style>