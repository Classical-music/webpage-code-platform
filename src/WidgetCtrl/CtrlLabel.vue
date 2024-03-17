<script setup>

const props = defineProps({
    param: Object
})

</script>

<template>
    <div>{{ param?.text }}</div>
</template>

<style scoped>
</style>