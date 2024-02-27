<script setup>
import { computed } from 'vue';


const props = defineProps({
    param: Object
})

const commonStyle = computed(_ => {
  let param = props.param
  return {
    left: param?.pos?.x + 'px',
    top: param?.pos?.y + 'px',
    width: param?.size?.w + 'px',
    height: param?.size?.h + 'px'
  }
})

</script>

<template>
    <div class="editor-body" :style="commonStyle">
        <div v-drag-move:arg="param" class="center"></div>
        <div class="top-left"></div>
        <div class="top"></div>
        <div class="top-right"></div>
        <div class="left"></div>
        <div class="right"></div>
        <div class="bottom-left"></div>
        <div class="bottom"></div>
        <div class="bottom-right"></div>        
    </div>
</template>

<style scoped>
.editor-body {
    position: relative;
    border: 1px dashed blue;
    padding: 10px;
}
.editor-body>div {
    width: 8px;
    height: 8px;
    border: 1px solid grey;
    margin: 0px;
    position: absolute;
}
.center {
    border: 1px solid grey;
    cursor: move;
}
.top-left {
    top: 0px;
    left: 0px;
    cursor: nw-resize;
}
.top {
    top: 0px;
    left: 50%;
    cursor: n-resize;
}
.top-right {
    top: 0px;
    right: 0px;
    cursor: ne-resize;
}
.left {
    top: 50%;
    left: 0px;
    cursor: w-resize;
}
.right {
    top: 50%;
    right: 0px;
    cursor: e-resize;
}
.bottom-left {
    bottom: 0px;
    left: 0px;
    cursor: sw-resize;
}
.bottom {
    bottom: 0px;
    left: 50%;
    cursor: s-resize;
}
.bottom-right {
    bottom: 0px;
    right: 0px;
    cursor: se-resize;
}
</style>