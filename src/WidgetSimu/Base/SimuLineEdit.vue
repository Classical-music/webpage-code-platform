<script setup>

const props = defineProps({
    param: Object
})

</script>

<template>
    <input class="line-edit-body" v-model="param.text" />
</template>

<style scoped>
.line-edit-body {
  border: 1px solid grey;
  background: #eeeeee;
  cursor: pointer;
}
</style>