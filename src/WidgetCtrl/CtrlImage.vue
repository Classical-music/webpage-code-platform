<script setup>

const props = defineProps({
    param: Object
})

</script>

<template>
    <img :src="param?.src" />
</template>

<style scoped>

</style>