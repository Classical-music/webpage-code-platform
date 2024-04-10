<script setup>
import { computed } from 'vue';
import CtrlCommon from '@WidgetCtrl/CtrlCommon.vue';

const pageData = {
  "type": "Page",
  "name": "Page-0",
  "isSelect": true,
  "rect": {
    "x": 0,
    "y": 0,
    "w": 800,
    "h": 500
  },
  "subs": [
    {
      "type": "CtrlCus_0",
      "name": "CtrlCus_0-0",
      "isSelect": false,
      "rect": {
        "x": 7,
        "y": 58,
        "w": 348,
        "h": 279
      }
    },
    {
      "type": "CtrlCus_0",
      "name": "CtrlCus_0-1",
      "isSelect": false,
      "rect": {
        "x": 393,
        "y": 28,
        "w": 320,
        "h": 274
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