<script setup>

const props = defineProps({
    param: Object
})

</script>

<template>
    <div v-lt-resize:arg="param" class="top-left"></div>
    <div v-t-resize:arg="param" class="top"></div>
    <div v-rt-resize:arg="param" class="top-right"></div>
    <div v-l-resize:arg="param" class="left"></div>
    <div v-r-resize:arg="param" class="right"></div>
    <div v-lb-resize:arg="param" class="bottom-left"></div>
    <div v-b-resize:arg="param" class="bottom"></div>
    <div v-rb-resize:arg="param" class="bottom-right"></div>
</template>

<style scoped>
div {
    width: 8px;
    height: 8px;
    border: 1px solid blue;
    margin: 0px;
    position: absolute;
}
.top-left {
    top: -9px;
    left: -9px;
    cursor: nw-resize;
}
.top {
    top: -9px;
    left: calc(50% - 4px);
    cursor: n-resize;
}
.top-right {
    top: -9px;
    right: -9px;
    cursor: ne-resize;
}
.left {
    top: calc(50% - 4px);
    left: -9px;
    cursor: w-resize;
}
.right {
    top: calc(50% - 4px);
    right: -9px;
    cursor: e-resize;
}
.bottom-left {
    bottom: -9px;
    left: -9px;
    cursor: sw-resize;
}
.bottom {
    bottom: -9px;
    left: calc(50% - 4px);
    cursor: s-resize;
}
.bottom-right {
    bottom: -9px;
    right: -9px;
    cursor: se-resize;
}
</style>