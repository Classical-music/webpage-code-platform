<script setup>
import { computed } from 'vue';
import CtrlCommon from '@WidgetCtrl/CtrlCommon.vue';

const pageData = {
  "type": "Page",
  "name": "Page-0",
  "isSelect": false,
  "rect": {
    "x": 146,
    "y": 71,
    "w": 800,
    "h": 500
  },
  "subs": [
    {
      "type": "CtrlCus_0",
      "name": "CtrlCus_0-3",
      "isSelect": false,
      "rect": {
        "x": 176,
        "y": 236,
        "w": 306,
        "h": 114
      }
    }
  ]
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