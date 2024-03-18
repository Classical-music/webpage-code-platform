<script setup>
import { computed } from 'vue';
import CtrlCommon from '@WidgetCtrl/CtrlCommon.vue';

const pageData = {
  "type": "Page",
  "name": "Page-1",
  "isSelect": false,
  "rect": {
    "x": 0,
    "y": 0,
    "w": 800,
    "h": 500
  },
  "subs": []
}

const subs = computed(_ => {
    return pageData?.subs ?? []
})

</script>

<template>
    <div class="container-page">
        <CtrlCommon v-for="item in subs" :param="item"></CtrlCommon>
    </div>
</template>

<style scoped>
.container-page {
    border: 1px dashed grey;
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>