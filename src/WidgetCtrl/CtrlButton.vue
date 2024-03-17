<script setup>

const props = defineProps({
    param: Object
})

</script>

<template>
    <button>{{ param?.text }}</button>
</template>

<style scoped>
</style>