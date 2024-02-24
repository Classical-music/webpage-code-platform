<script setup>
import { computed } from 'vue';


const props = defineProps({
    param: Object
})

const bodyStyle = computed(_ => {
    let param = props.param
    return {
        left: param?.x + 'px',
        top: param?.y + 'px'
    }
})

const containerStyle = computed(_ => {
    let param = props.param
    return {
        width: 800 + 'px',
        height: 800 + 'px'
    }
})

</script>

<template>
    <div :style="bodyStyle" class="screen-body">
        <div class="screen-title" v-drag-move:arg="param"></div>
        <div class="screen-container">
            <slot name='content'>
                content
            </slot>
        </div>
    </div>
</template>

<style scoped>
.screen-body {
    border: 3px solid grey;
    border-radius: 8px 8px 0px 0px;
    width: 800px;
    height: 500px;
    position: absolute;
}

.screen-title {
    width: 100%;
    height: 20px;
    background: grey;
    cursor: pointer;
}

.screen-container {
    height: calc(100% - 20px);
    width: 100%;
    overflow: auto;
    background: #ffffff;
}
</style>